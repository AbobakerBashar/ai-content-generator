import { getPlans } from "@/actions/plans";
import { getUser } from "@/actions/users";
import Pricing from "@/components/home/Pricing";
import ComparisonTable from "@/components/pricing/ComparisonTable";
import FAQSection from "@/components/pricing/FAQSection";

export const metadata = {
	title: "Pricing - AI Content Generator",
	description:
		"Explore our flexible pricing plans for AI content generation. Choose the perfect plan for your needs, with transparent pricing and a 7-day free trial.",
};

const loadeData = async () => {
	try {
		const [user, plans] = await Promise.all([getUser(), getPlans()]);
		return { user, plans };
	} catch (error) {
		throw new Error(error.message || "Failed to load data");
	}
};

const PricingPage = async () => {
	const { user, plans } = await loadeData();
	const isLoggedIn = !!user;

	return (
		<div className="min-h-screen bg-linear-to-b from-background to-muted/20">
			{/* Page Header */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
				<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
					Simple, Transparent Pricing
				</h1>
				<p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
					Choose the perfect plan for your content needs. All plans include a
					7-day free trial with full access to premium features.
				</p>
			</div>

			{/* Pricing Section */}
			<Pricing isLoggedIn={isLoggedIn} user={user} plans={plans} />

			{/* FAQ Section */}
			{/* <FAQSection /> */}

			{/* Comparison Table */}
			{/* <ComparisonTable /> */}
		</div>
	);
};

export default PricingPage;
