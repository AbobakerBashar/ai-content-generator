import { getCurrentUser } from "@/actions/users";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
const fetchUser = async () => {
	try {
		const user = await getCurrentUser();
		return user;
	} catch (error) {
		throw new Error("Failed to fetch user data");
	}
};

const SingleCATSection = async () => {
	const user = await fetchUser();
	const isAuthenticated = !!user;

	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
			<h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
				Ready to Create Like This?
			</h2>
			<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
				Start generating high-quality content in seconds. Get started with our
				free trial and see what&apos;s possible.
			</p>

			{isAuthenticated ? (
				<Link
					href="/dashboard/generate"
					className="inline-flex items-center justify-center gap-2 px-12 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
				>
					Generate Content <Zap className="w-5 h-5" />
				</Link>
			) : (
				<Link
					href="/auth/sign-up"
					className="inline-flex items-center justify-center gap-2 px-12 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
				>
					Try for Free <ArrowRight className="w-5 h-5" />
				</Link>
			)}
		</div>
	);
};

export default SingleCATSection;
