"use client";

import UpgradeModal from "@/components/home/UpgradeModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ChevronDown, ShoppingCart, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Pricing = ({ plans, userPlan, user }) => {
	const router = useRouter();
	const [openModal, setOpenModal] = useState(null);
	const [selectedPlan, setSelectedPlan] = useState(null);

	const handleUpgradeClick = (planName, price) => {
		if (!user) {
			router.push("/auth/sign-up?redirect=/credits");
			return;
		}
		const planId =
			planName.toLowerCase() === "starter"
				? "free"
				: planName.toLowerCase() === "professional"
					? "pro"
					: "enterprise";
		const name = planName.charAt(0).toUpperCase() + planName.slice(1);
		setSelectedPlan({ id: planId, name, price });
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
		setSelectedPlan(null);
	};

	return (
		<>
			<div className="mb-12">
				<h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
					Choose Your Plan
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
					{Object.entries(plans).map(([key, value]) => (
						<Card
							key={value.name}
							className={`p-6 flex flex-col dark:bg-slate-900 dark:border-slate-800 relative transition-all ${
								value.popular
									? "ring-2 ring-blue-500 transform md:scale-105"
									: ""
							}`}
						>
							{value.popular && (
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
									<Badge className="bg-blue-600 text-white">Most Popular</Badge>
								</div>
							)}

							<div className="mb-6 pt-2">
								<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
									{value.name}
								</h3>
								<div className="flex items-baseline gap-1">
									<Zap className="w-5 h-5 text-yellow-500" />
									<span className="text-3xl font-bold text-slate-900 dark:text-white">
										{value.credits.toLocaleString()}
									</span>
									<span className="text-slate-600 dark:text-slate-400">
										credits
									</span>
								</div>
								<p className="text-slate-600 dark:text-slate-400 mt-2">
									<span className="text-2xl font-bold text-slate-900 dark:text-white">
										{value.price}
									</span>
									<span className="text-slate-600 dark:text-slate-400">
										{value.month}
									</span>
								</p>
							</div>

							<div className="space-y-3 mb-6 flex-1">
								{value.features.map((feature, idx) => (
									<div key={idx} className="flex items-start gap-3">
										<Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
										<span className="text-slate-700 dark:text-slate-300 text-sm">
											{feature}
										</span>
									</div>
								))}
							</div>

							<Button
								disabled={userPlan === key.toLocaleLowerCase()}
								className={`w-full text-xs ${
									value.popular
										? "bg-blue-600 hover:bg-blue-700 text-white"
										: "bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white"
								}`}
								onClick={() => handleUpgradeClick(value.name, value.price)}
							>
								{key.toLocaleLowerCase() === "free" ? (
									userPlan === "free" ? (
										<>
											<Check className="w-4 h-4 mr-1.5" />
											Current Plan
										</>
									) : (
										"Downgrade to Free"
									)
								) : userPlan === key.toLocaleLowerCase() ? (
									<>
										<Check className="w-4 h-4 mr-1.5" />
										Current Plan
									</>
								) : (
									<>
										<ShoppingCart className="w-4 h-4 mr-1.5" />
										Upgrade to {value.name}
									</>
								)}
							</Button>
						</Card>
					))}
				</div>
			</div>
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
