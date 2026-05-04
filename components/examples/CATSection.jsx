import { getCurrentUser } from "@/actions/users";
import Link from "next/link";

const fetchUser = async () => {
	try {
		const user = await getCurrentUser();
		return user;
	} catch (error) {
		throw new Error("Failed to fetch user data");
	}
};

const CATSection = async () => {
	const user = await fetchUser();
	const isAuthenticated = !!user;

	return (
		<section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
			<h2 className="text-4xl md:text-5xl font-bold mb-6">
				Ready to Create Amazing Content?
			</h2>
			<p className="text-xl text-muted-foreground mb-8">
				Start creating professional, engaging content in seconds. Try our AI
				content generator for free today.
			</p>
			<div className="flex flex-col sm:flex-row gap-4 justify-center">
				<Link
					href={isAuthenticated ? "/dashboard/generate" : "/auth/sign-up"}
					className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
				>
					Start Free Trial
				</Link>
				<Link
					href="/pricing"
					className="inline-block px-8 py-3 border border-border rounded-lg font-semibold hover:bg-accent transition-colors"
				>
					View Pricing
				</Link>
			</div>
		</section>
	);
};

export default CATSection;
