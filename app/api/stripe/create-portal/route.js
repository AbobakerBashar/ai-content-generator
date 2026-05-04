import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
	try {
		const supabase = await createClient();

		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { data: userData, error: dbError } = await supabase
			.from("users")
			.select("stripe_customer_id, plan_tier")
			.eq("id", user.id)
			.single();

		if (dbError || !userData) {
			return NextResponse.json(
				{ error: dbError?.message || "User profile not found" },
				{ status: 404 },
			);
		}

		// 3. Handle Free users who don't have a Stripe account yet
		if (!userData.stripe_customer_id) {
			return NextResponse.json(
				{ error: "No active subscription found. Please upgrade first." },
				{ status: 400 },
			);
		}

		// 4. Generate the Stripe Customer Portal session
		const portalSession = await stripe.billingPortal.sessions.create({
			customer: userData.stripe_customer_id,
			return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
		});

		// 5. Send the secure URL back to the frontend
		return NextResponse.json({ url: portalSession.url });
	} catch (error) {
		console.error("Stripe Portal Error:", error);
		return NextResponse.json(
			{ error: error.message || "Failed to create billing portal session" },
			{ status: 500 },
		);
	}
}

export async function GET() {
	return NextResponse.json({ message: "Billing portal endpoint is live" });
}
