"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UpgradeModal from "./UpgradeModal";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";

const Pricing = ({ isLoggedIn, user, plans }) => {
	const freePlan = plans.free;
	const proPlan = plans.pro;
	const enterprisePlan = plans.enterprise;

	const [openModal, setOpenModal] = useState(null);
	const [selectedPlan, setSelectedPlan] = useState(null);
	const router = useRouter();

	const handleUpgradeClick = (planId, planName, price) => {
		if (!isLoggedIn) {
			router.push("/auth/sign-up?redirect=/pricing");
			return;
		}
		setSelectedPlan({ id: planId, name: planName, price });
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
		setSelectedPlan(null);
	};

	return (
		<>
			<section
				id="pricing"
				className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
			>
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-4">
						Simple, Transparent Pricing
					</h2>
					<p className="text-xl text-muted-foreground">
						Choose the plan that works best for you
					</p>
				</div>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
					<Card className="hover:shadow-xl transition-shadow relative pb-24">
						<CardHeader>
							<CardTitle className="text-2xl font-semibold mb-2">
								{freePlan.name}
							</CardTitle>
							<CardDescription className="mb-6">
								{freePlan.description}
							</CardDescription>
						</CardHeader>
						<CardContent className="mb-18">
							<div className="mb-6">
								<span className="text-5xl font-bold">{freePlan.price}</span>
								<span className="text-muted-foreground">{freePlan.month}</span>
							</div>
							<ul className="space-y-3 mb-8">
								{freePlan.features.map((feature, index) => (
									<li key={index} className="flex items-start gap-3">
										<CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
										<span>{feature}</span>
									</li>
								))}
							</ul>
						</CardContent>
						<CardFooter className="h-18 bottom-0 absolute left-0 w-full">
							<button
								disabled={user?.plan_tier?.toLowerCase() === "free"}
								onClick={() => {
									if (!isLoggedIn) router.push("/auth/sign-up");
								}}
								className="w-full block text-center py-3 rounded-lg border border-border hover:bg-accent"
							>
								{!isLoggedIn
									? "Get Started"
									: user?.plan_tier?.toLowerCase() === "free"
										? "Current Plan"
										: "Downgrade"}
							</button>
						</CardFooter>
					</Card>
					<Card className="bg-primary h-full text-primary-foreground relative overflow-hidden hover:shadow-xl transition-shadow">
						<div className="absolute top-2 right-3 bg-primary-foreground text-primary px-2.5 py-0.5 rounded-full text-sm font-semibold">
							Popular
						</div>
						<CardHeader>
							<CardTitle className="text-2xl font-semibold mb-2">
								{proPlan.name}
							</CardTitle>
							<CardDescription className="text-primary-foreground/80 mb-6">
								{proPlan.description}
							</CardDescription>
						</CardHeader>
						<CardContent className="mb-18">
							<div className="mb-6">
								<span className="text-5xl font-bold">{proPlan.price}</span>
								<span className="text-primary-foreground/80">
									{proPlan.month}
								</span>
							</div>
							<ul className="space-y-3 mb-8 ">
								{proPlan.features.map((feature, index) => (
									<li key={index} className="flex items-start gap-3">
										<CheckCircle2 className="w-5 h-5 text-primary-foreground shrink-0 mt-0.5" />
										<span>{feature}</span>
									</li>
								))}
							</ul>
						</CardContent>
						<CardFooter className="h-18 bottom-0 absolute left-0 w-full">
							<button
								onClick={() => handleUpgradeClick("pro", "Pro", 29)}
								disabled={user?.plan_tier?.toLowerCase() === "pro"}
								className="w-full py-3 rounded-lg bg-primary-foreground text-primary font-semibold hover:opacity-90 transition-opacity block text-center"
							>
								{!isLoggedIn
									? "Start Free Trial"
									: user?.plan_tier?.toLowerCase() === "pro"
										? "Current Plan"
										: "Upgrade to Pro"}
							</button>
						</CardFooter>
					</Card>
					<Card className="hover:shadow-xl transition-shadow relative">
						<CardHeader>
							<CardTitle className="text-2xl font-semibold mb-2">
								{enterprisePlan.name}
							</CardTitle>
							<CardDescription className="mb-6">
								{enterprisePlan.description}
							</CardDescription>
						</CardHeader>
						<CardContent className="mb-18">
							<div className="mb-6">
								<span className="text-5xl font-bold">
									{enterprisePlan.price}
								</span>
								<span className="text-muted-foreground">
									{enterprisePlan.month}
								</span>
							</div>
							<ul className="space-y-3 mb-8">
								{enterprisePlan.features.map((feature, index) => (
									<li key={index} className="flex items-start gap-3">
										<CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
										<span>{feature}</span>
									</li>
								))}
							</ul>
						</CardContent>
						<CardFooter className="h-18 bottom-0 absolute left-0 w-full">
							<button
								onClick={() =>
									handleUpgradeClick("enterprise", "Enterprise", 99)
								}
								disabled={user?.plan_tier?.toLowerCase() === "enterprise"}
								className="w-full py-3 rounded-lg border border-border hover:bg-accent transition-colors block text-center"
							>
								{!isLoggedIn
									? "Contact Sales"
									: user?.plan_tier?.toLowerCase() === "enterprise"
										? "Current Plan"
										: "Upgrade to Enterprise"}
							</button>
						</CardFooter>
					</Card>
				</div>
			</section>
			{selectedPlan && (
				<UpgradeModal
					isOpen={openModal}
					onClose={handleCloseModal}
					plan={selectedPlan}
					user={user}
				/>
			)}
		</>
	);
};

export default Pricing;
