"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getStripe } from "@/utils/stripe/stripe-client";
import {
	Elements,
	CardElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "sonner";

const CheckoutFormContent = ({ plans, user }) => {
	const [selectedPlan, setSelectedPlan] = useState(plans[0].id);
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState(user?.email || "");
	const stripe = useStripe();
	const elements = useElements();

	const selectedPlanData = plans.find((p) => p.id === selectedPlan);

	const handleCheckout = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			toast.error("Stripe is not loaded yet");
			return;
		}

		if (!selectedPlanData) {
			toast.error("Please select a plan");
			return;
		}

		setIsLoading(true);

		try {
			// Redirect to Stripe Checkout (recommended approach)
			const response = await fetch("/api/checkout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					planId: selectedPlan,
					email: email || user?.email,
					price: selectedPlanData.price,
					planName: selectedPlanData.name,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to create checkout session");
			}

			const { sessionId } = await response.json();

			// Redirect to Stripe Checkout
			const { error } = await stripe.redirectToCheckout({ sessionId });

			if (error) {
				toast.error(error.message || "Failed to redirect to checkout");
			}
		} catch (error) {
			console.error("Checkout error:", error);
			toast.error(error.message || "An error occurred during checkout");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Payment Details</CardTitle>
				<CardDescription>
					Enter your payment information to complete the upgrade
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleCheckout} className="space-y-6">
					{/* Plan Selection */}
					<div className="space-y-3">
						<Label className="text-base font-semibold">Select Plan</Label>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							{plans.map((plan) => (
								<div
									key={plan.id}
									onClick={() => setSelectedPlan(plan.id)}
									className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
										selectedPlan === plan.id
											? "border-primary bg-primary/5"
											: "border-border hover:border-primary/50"
									}`}
								>
									<div className="font-semibold mb-1">{plan.name}</div>
									<div className="text-2xl font-bold text-primary">
										{plan.displayPrice}
									</div>
									<div className="text-sm text-muted-foreground mt-1">
										/month
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Selected Plan Summary */}
					{selectedPlanData && (
						<div className="bg-accent/50 border border-border rounded-lg p-4 space-y-2">
							<div className="flex justify-between items-center">
								<span className="text-muted-foreground">Plan:</span>
								<span className="font-semibold">{selectedPlanData.name}</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-muted-foreground">Price:</span>
								<span className="font-semibold text-lg">
									{selectedPlanData.displayPrice}
								</span>
							</div>
							<div className="border-t border-border pt-2 mt-2 flex justify-between items-center font-semibold">
								<span>Total:</span>
								<span className="text-primary text-xl">
									{selectedPlanData.displayPrice}
								</span>
							</div>
						</div>
					)}

					{/* Email */}
					<div className="space-y-2">
						<Label htmlFor="email">Email Address</Label>
						<Input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="your@email.com"
							required
							className="bg-background"
						/>
					</div>

					{/* Billing Information */}
					<div className="space-y-3">
						<Label className="text-base font-semibold">Card Details</Label>
						<div className="border border-border rounded-lg p-4 bg-background">
							<CardElement
								options={{
									style: {
										base: {
											fontSize: "16px",
											color: "currentColor",
											"::placeholder": {
												color: "hsl(var(--muted-foreground))",
											},
										},
										invalid: {
											color: "hsl(var(--destructive))",
										},
									},
									hidePostalCode: true,
								}}
							/>
						</div>
					</div>

					{/* Terms and Conditions */}
					<div className="text-sm text-muted-foreground">
						<p>
							By completing this purchase, you agree to our{" "}
							<a href="#" className="text-primary hover:underline">
								Terms of Service
							</a>{" "}
							and{" "}
							<a href="#" className="text-primary hover:underline">
								Privacy Policy
							</a>
							.
						</p>
					</div>

					{/* Payment Method Note */}
					<div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
						<p className="text-sm text-blue-900 dark:text-blue-200">
							<span className="font-semibold">Test Card:</span> Use 4242 4242
							4242 4242 (any future expiry date and any CVC)
						</p>
					</div>

					{/* Submit Button */}
					<Button
						type="submit"
						disabled={!stripe || isLoading}
						className="w-full py-6 text-lg font-semibold"
					>
						{isLoading
							? "Processing..."
							: `Pay ${selectedPlanData?.displayPrice || "$0.00"}`}
					</Button>

					{/* Info */}
					<p className="text-xs text-muted-foreground text-center">
						Your payment is secure and encrypted
					</p>
				</form>
			</CardContent>
		</Card>
	);
};

export default function CheckoutForm({ plans, user }) {
	const stripePromise = getStripe();

	return (
		<Elements stripe={stripePromise}>
			<CheckoutFormContent plans={plans} user={user} />
		</Elements>
	);
}
