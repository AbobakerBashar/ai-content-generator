import { getFAQs } from "@/actions/faq";
import { getRecentGenerations } from "@/actions/generate";
import { getPlans } from "@/actions/plans";
import { getUser } from "@/actions/users";
import FAQ from "@/components/dashboard/credits/FAQ";
import Pricing from "@/components/dashboard/credits/Pricing";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TrendingDown, Zap } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
	title: "Credits & Plans - AI Content Generator",
	description:
		"View your credit balance, usage history, and explore our pricing plans to find the best fit for your content generation needs.",
};

const loadeData = async () => {
	try {
		const [user, plans, faqs, usageHistory] = await Promise.all([
			getUser(),
			getPlans(),
			getFAQs(),
			getRecentGenerations(),
		]);
		return { user, plans, faqs, usageHistory };
	} catch (error) {
		throw new Error(error.message || "Failed to load credit data");
	}
};

const contentTypes = {
	blog: "Blog Post",
	social_media: "Social Media",
	email: "Email",
	ad_copy: "Ad Copy",
	product_description: "Product Description",
	other: "Other",
};

export default async function CreditsPage() {
	const { user, plans, faqs, usageHistory } = await loadeData();

	// Current user credits info
	const current = user.credits || 0;
	const total = plans[user.plan_tier.toLowerCase()]?.credits || 0;
	const userCredits = {
		current,
		total,
		used: 550,
		usagePercentage: Math.round(((total - current) / (total || 1)) * 100),
		nextRefill: "2024-05-20",
	};

	return (
		<div className="min-h-screen bg-white dark:bg-slate-950 p-4 sm:p-6 md:p-8">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
					Credits & Plans
				</h1>
				<p className="text-slate-600 dark:text-slate-400">
					Manage your usage and upgrade your plan
				</p>
			</div>

			{/* Credit Balance Card */}
			<Card className="p-6 sm:p-8 bg-linear-to-r from-blue-500 to-blue-600 text-white mb-8 max-w-4xl">
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
					<div>
						<p className="text-blue-100 text-sm font-medium mb-2">
							Available Credits
						</p>
						<div className="flex items-baseline gap-2">
							<Zap className="w-6 h-6" />
							<span className="text-4xl font-bold">{userCredits.current}</span>
						</div>
					</div>

					<div>
						<p className="text-blue-100 text-sm font-medium mb-2">
							Monthly Total
						</p>
						<p className="text-3xl font-bold">{userCredits.total}</p>
					</div>

					<div>
						<p className="text-blue-100 text-sm font-medium mb-2">
							Next Refill
						</p>
						<p className="text-2xl font-bold">{userCredits.nextRefill}</p>
					</div>
				</div>

				{/* Usage Bar */}
				<div className="mt-6">
					<div className="flex justify-between items-center mb-2">
						<span className="text-blue-100 text-sm">Usage this month</span>
						<span className="text-blue-100 text-sm font-medium">
							{userCredits.usagePercentage}%
						</span>
					</div>
					<div className="w-full bg-blue-400 rounded-full h-2">
						<div
							className="bg-white h-2 rounded-full transition-all duration-500"
							style={{ width: `${userCredits.usagePercentage}%` }}
						/>
					</div>
				</div>
			</Card>

			{/* Pricing Plans */}

			<Pricing
				plans={plans}
				userPlan={user.plan_tier.toLowerCase()}
				user={user}
			/>

			{/* Usage History */}
			<div className="max-w-4xl">
				<h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
					Recent Usage
				</h2>
				{usageHistory.length === 0 ? (
					<p className="text-slate-600 dark:text-slate-400">
						No usage history found. Start generating content to see your usage
						here!
					</p>
				) : (
					<div className="space-y-3">
						{usageHistory.map((generation) => (
							<Card
								key={generation.id}
								className="p-4 dark:bg-slate-900 dark:border-slate-800"
							>
								<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-1">
											<TrendingDown className="w-4 h-4 text-red-500" />
											<h3 className="font-medium text-slate-900 dark:text-white">
												{generation.prompt.length > 50
													? generation.prompt.substring(0, 50) + "..."
													: generation.prompt}
											</h3>
										</div>
										<p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
											<Badge variant="outline" className="px-2 py-1">
												{contentTypes[generation.content_type] ||
													generation.content_type}
											</Badge>
											{generation.created_at.substring(0, 10)}
										</p>
									</div>
									<div className="text-right">
										<p className="text-lg font-bold text-red-600 dark:text-red-400">
											-{generation.tokens_used || 0}
										</p>
										<p className="text-xs text-slate-500 dark:text-slate-400">
											credits
										</p>
									</div>
								</div>
							</Card>
						))}
					</div>
				)}
			</div>

			{/* FAQ */}
			<FAQ faqs={faqs} />
		</div>
	);
}
