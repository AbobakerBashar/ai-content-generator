import { getRecentGenerations, getUserStats } from "@/actions/generate";
import { getUser } from "@/actions/users";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ArrowRight,
	CheckCircle2,
	Clock,
	Copy,
	Share2,
	Star,
	Zap,
} from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export const metadata = {
	title: "Dashboard - AI Content Generator",
	description:
		"Your personalized dashboard to manage and track your AI content generation.",
};

const loadUser = async () => {
	try {
		const user = await getUser();
		return user;
	} catch (error) {
		throw new Error("Failed to load user data");
	}
};

const fetchData = async (userId) => {
	try {
		const [{ total, success, failed }, recentGenerations] = await Promise.all([
			getUserStats(userId),
			getRecentGenerations(3),
		]);
		return { total, success, failed, recentGenerations };
	} catch (error) {
		throw new Error("Failed to load dashboard data");
	}
};

export default async function Dashboard() {
	const user = await loadUser();
	const { total, recentGenerations } = await fetchData(user.id);

	return (
		<div className="min-h-screen bg-linear-to-b from-background to-muted/20">
			{/* Hero Greeting */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
				<div className="text-center max-w-4xl mx-auto">
					<h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
						Welcome back, {user.email.split("@")[0]}!
					</h1>
					<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
						Ready to create amazing content? Let&apos;s get started.
					</p>
					<div className="flex flex-col md:flex-row items-center justify-center gap-4">
						<Link
							href="/dashboard/generate"
							className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-full transition-colors"
						>
							<Zap className="w-5 h-5" />
							Generate Content
						</Link>
						<div className="inline-flex items-center gap-2 bg-accent px-6 py-3 rounded-full">
							<Zap className="w-5 h-5 text-accent-foreground" />
							<Badge
								variant="secondary"
								className="font-mono bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20 px-3 py-1"
							>
								💎 {user.credits || 0} Credits
							</Badge>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Grid */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
				<div className="grid md:grid-cols-3 gap-8">
					<Card className="hover:shadow-xl transition-shadow">
						<CardHeader>
							<CardTitle>Credits</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-4xl font-bold">{user.credits || 0}</div>
							<p className="text-2xl text-muted-foreground">Remaining</p>
						</CardContent>
					</Card>
					<Card className="hover:shadow-xl transition-shadow">
						<CardHeader>
							<CardTitle>Generations</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-4xl font-bold">{total}</div>
							<p className="text-2xl text-muted-foreground">Total</p>
						</CardContent>
					</Card>
					<Card className="hover:shadow-xl transition-shadow">
						<CardHeader>
							<CardTitle>Avg Rating</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-4xl font-bold flex items-center gap-1">
								4.8 <Star className="w-6 h-6 fill-primary text-primary" />
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
				{/* Recent History Preview */}
				<Card className="hover:shadow-xl transition-shadow">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Clock className="w-6 h-6" /> Recent History
						</CardTitle>
						<CardDescription>Last 3 generations</CardDescription>
					</CardHeader>

					{recentGenerations.length === 0 ? (
						<CardContent className="text-center py-10">
							<p className="text-muted-foreground">
								No recent generations found.
							</p>
						</CardContent>
					) : (
						<CardContent className="space-y-4">
							{recentGenerations.map((gen) => (
								<div
									key={gen.id}
									className="p-4 border rounded-xl hover:bg-muted/50 transition-colors"
								>
									<div className="flex justify-between items-start mb-2">
										<h4 className="font-semibold">{gen.prompt}</h4>
										<div className="flex items-center gap-1 text-sm text-muted-foreground">
											<Star className="w-4 h-4 fill-primary text-primary" />
											{gen.rating}
										</div>
									</div>
									<p className="text-sm text-muted-foreground mb-3 line-clamp-2 col-end-1">
										{gen.content}
									</p>
									<div className="flex items-center gap-2 text-xs text-muted-foreground">
										<Clock className="w-4 h-4" /> {gen.created_at.split("T")[0]}
										<div className="flex gap-1 ml-auto">
											<Button variant="ghost" size="sm">
												<Copy className="w-4 h-4" />
											</Button>
											<Button variant="ghost" size="sm">
												<Share2 className="w-4 h-4" />
											</Button>
										</div>
									</div>
								</div>
							))}
							<Button variant="link" className="w-full p-0 h-auto text-sm">
								<Link
									href="/dashboard/history"
									className="flex items-center gap-1.5 justify-center"
								>
									View Full History <ArrowRight className="w-4 h-4" />
								</Link>
							</Button>
						</CardContent>
					)}
				</Card>
			</div>

			{/* CTA Section */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
				<div className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-3xl p-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-6">
						Ready for more? Upgrade today!
					</h2>
					<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
						Unlock unlimited generations and premium features.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" className="w-full sm:w-auto">
							Upgrade to Pro <CheckCircle2 className="w-5 h-5 ml-2" />
						</Button>
						<Button variant="outline" size="lg" className="w-full sm:w-auto">
							<Link
								href="/dashboard/history"
								className="flex items-center gap-2"
							>
								View History
							</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
