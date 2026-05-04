import Link from "next/link";

const CTASection = ({ isLoggedIn }) => {
	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
			<div className="bg-linear-to-r from-primary to-primary/80 rounded-3xl p-12 md:p-16 text-center text-primary-foreground">
				<h2 className="text-4xl md:text-5xl font-bold mb-4">
					Ready to Transform Your Content?
				</h2>
				<p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
					Join thousands of creators who are already using ContentAI to produce
					amazing content faster than ever.
				</p>
				<Link
					href={isLoggedIn ? "/dashboard/generate" : "/auth/sign-up"}
					className="bg-primary-foreground text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity"
				>
					{isLoggedIn ? "Generate Your Content" : "Get Started for Free Trial"}
				</Link>
				<p className="text-sm text-primary-foreground/80 mt-4">
					No credit card required • Cancel anytime
				</p>
			</div>
		</section>
	);
};

export default CTASection;
