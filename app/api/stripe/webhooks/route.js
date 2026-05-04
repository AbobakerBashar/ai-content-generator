import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2023-10-16",
});

export async function POST(req) {
	// 1. Get the raw text body and the signature header
	const rawBody = await req.text();
	const headersList = await headers();
	const signature = headersList.get("stripe-signature");

	let event;

	try {
		// 2. Verify the request genuinely came from Stripe
		event = stripe.webhooks.constructEvent(
			rawBody,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET,
		);
	} catch (err) {
		return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
	}

	// 3. Listen for the specific "payment successful" event
	if (event.type === "checkout.session.completed") {
		const session = event.data.object;

		// 4. Extract the custom metadata you passed during checkout creation
		const userId = session.metadata?.userId;
		const planId = session.metadata?.planId;

		if (userId && planId) {
			// 5. Initialize Supabase Admin Client (Bypasses RLS)
			const supabaseAdmin = createClient(
				process.env.NEXT_PUBLIC_SUPABASE_URL,
				process.env.SUPABASE_SERVICE_ROLE_KEY,
			);

			// Determine how many credits to give based on the plan
			const creditsToAdd = planId === "pro" ? 10000 : 40000;

			// 6. Update the user's tier, credits, and save their permanent Stripe ID
			const { error } = await supabaseAdmin
				.from("users")
				.update({
					plan_tier: planId,
					credits: creditsToAdd,
					stripe_customer_id: session.customer,
				})
				.eq("id", userId);

			if (error) {
				return NextResponse.json(
					{ error: "Database update failed" },
					{ status: 500 },
				);
			}
		}
	}

	revalidatePath("/dashboard");
	revalidatePath("/dashboard/generate");
	revalidatePath("/dashboard/credits");
	revalidatePath("/pricing");
	revalidatePath("/");

	return NextResponse.json({ received: true }, { status: 200 });
}
