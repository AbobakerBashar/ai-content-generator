import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2023-10-16",
});

export async function POST(req) {
	try {
		const body = await req.json();
		const { planId, email, price, planName } = body;

		if (!planId || !email) {
			return NextResponse.json(
				{ error: "Missing planId or email" },
				{ status: 400 },
			);
		}

		const supabase = await createClient();
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// 1. Fetch the user to see if they ALREADY have a Stripe ID
		const { data: userData, error: getCustomerError } = await supabase
			.from("users")
			.select("stripe_customer_id")
			.eq("id", user.id)
			.single();
		if (getCustomerError) {
			return NextResponse.json(
				{ error: "Failed to fetch user data" },
				{ status: 500 },
			);
		}
		let stripeCustomerId = userData?.stripe_customer_id;

		// 2. If they don't have one, create it in Stripe NOW
		if (!stripeCustomerId) {
			const customer = await stripe.customers.create({
				email: email,
				metadata: {
					supabaseUserId: user.id,
				},
			});

			stripeCustomerId = customer.id;

			// Save this new 'cus_...' ID to Supabase immediately
			const { error } = await supabase
				.from("users")
				.update({ stripe_customer_id: stripeCustomerId })
				.eq("id", user.id);
			if (error) {
				return NextResponse.json(
					{ error: "Failed to save Stripe customer ID" },
					{ status: 500 },
				);
			}
		}

		// Map plan IDs to product/price information
		const planDetails = {
			pro: {
				name: "Pro Plan - SPARKGEN",
				description: "100,000 words/month, unlimited content types",
				amount: 2900,
			},
			enterprise: {
				name: "Enterprise Plan - SPARKGEN",
				description: "Unlimited words/month, all features",
				amount: 9900,
			},
		};

		const planData = planDetails[planId] || {
			name: planName || "SPARKGEN Plan",
			description: "Premium plan",
			amount: price || 2900,
		};

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			customer: stripeCustomerId,
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: planData.name,
							description: planData.description,
						},
						unit_amount: planData.amount,
					},
					quantity: 1,
				},
			],
			mode: "payment",
			success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${req.headers.get("origin")}/pricing`,
			metadata: {
				planId,
				planName: planData.name,
				userId: user.id,
			},
		});

		return NextResponse.json({ url: session.url });
	} catch (err) {
		return NextResponse.json({ error: err.message }, { status: 500 });
	}
}
