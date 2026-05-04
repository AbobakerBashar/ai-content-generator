import { getUser } from "@/actions/users";
import CheckoutForm from "@/components/contact/checkout/CheckoutForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
	title: "Checkout - AI Content Generator",
	description: "Complete your purchase and upgrade your plan.",
};

const loadUser = async () => {
	try {
		const user = await getUser();
		return user;
	} catch (error) {
		throw new Error("Failed to load user data");
	}
};

const CheckoutPage = async () => {
	const user = await loadUser();

	if (!user) {
		return (
			<div className="min-h-screen bg-background">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<Card className="border-destructive">
						<CardHeader>
							<CardTitle>Authentication Required</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								Please sign in to complete your purchase.
							</p>
							<Link
								href="/auth/sign-in"
								className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
							>
								Sign In
							</Link>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	const plans = [
		{
			id: "pro",
			name: "Pro Plan",
			price: 2900, // in cents
			displayPrice: "$29.00",
			description: "Perfect for professionals",
			features: [
				"100,000 words/month",
				"Unlimited content types",
				"Premium templates",
				"Priority support",
				"Custom brand voice",
			],
			stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "price_pro",
		},
		{
			id: "enterprise",
			name: "Enterprise Plan",
			price: 9900, // in cents
			displayPrice: "$99.00",
			description: "For large teams",
			features: [
				"Unlimited words/month",
				"All content types",
				"All premium features",
				"24/7 support",
				"Dedicated account manager",
				"Custom integrations",
			],
			stripePriceId:
				process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID ||
				"price_enterprise",
		},
	];

	return (
		<div className="min-h-screen bg-linear-to-b from-background to-muted/20">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Header */}
				<div className="mb-8">
					<Link
						href="/dashboard"
						className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
					>
						<ArrowLeft className="w-4 h-4" />
						Back to Dashboard
					</Link>
					<h1 className="text-4xl font-bold mb-2">Upgrade Your Plan</h1>
					<p className="text-muted-foreground">
						Enhance your content generation capabilities with a premium plan
					</p>
				</div>

				<div className="grid lg:grid-cols-3 gap-8">
					{/* Plan Selection */}
					<div className="lg:col-span-1 space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Available Plans</CardTitle>
								<CardDescription>
									Current plan:{" "}
									<span className="font-semibold text-foreground capitalize">
										{user?.plan_tier || "free"}
									</span>
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-3">
								{plans.map((plan) => (
									<div
										key={plan.id}
										className="p-4 border rounded-lg hover:border-primary hover:bg-accent/50 transition-all cursor-pointer group"
									>
										<div className="flex items-start justify-between mb-2">
											<div>
												<h3 className="font-semibold group-hover:text-primary">
													{plan.name}
												</h3>
												<p className="text-sm text-muted-foreground">
													{plan.description}
												</p>
											</div>
										</div>
										<p className="text-2xl font-bold text-primary mb-3">
											{plan.displayPrice}
										</p>
										<div className="space-y-2">
											{plan.features.slice(0, 3).map((feature, idx) => (
												<p
													key={idx}
													className="text-sm text-muted-foreground flex items-start gap-2"
												>
													<span className="text-primary mt-0.5">✓</span>
													{feature}
												</p>
											))}
											{plan.features.length > 3 && (
												<p className="text-sm text-muted-foreground">
													+{plan.features.length - 3} more features
												</p>
											)}
										</div>
									</div>
								))}
							</CardContent>
						</Card>
					</div>

					{/* Checkout Form */}
					<div className="lg:col-span-2">
						<CheckoutForm plans={plans} user={user} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckoutPage;
