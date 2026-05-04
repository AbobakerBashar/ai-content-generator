import { getPlans } from "@/actions/plans";
import { getSession, getUser } from "@/actions/users";
import CTASection from "@/components/home/CTASection";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import Testimonials from "@/components/home/Testimonials";

export const revalidate = 0;

export const metadata = {
	title: "AI Credit Management - Home",
	description:
		"Manage your AI credits with ease. Upgrade your plan and track your usage.",
};

const fetchData = async () => {
	try {
		const [user, plans] = await Promise.all([getUser(), getPlans()]);
		return { user, plans };
	} catch (error) {
		throw new Error(error.message || "Failed to fetch data");
	}
};

export default async function Home() {
	const { user, plans } = await fetchData();

	const isLoggedIn = !!user;

	return (
		<div className="min-h-screen bg-linear-to-b from-background to-muted/20">
			{/* Hero Section */}
			<Hero isLoggedIn={isLoggedIn} />

			{/* Features Section */}
			<Features />

			{/* Pricing Section */}
			<Pricing isLoggedIn={isLoggedIn} user={user} plans={plans} />
			{/* Testimonials Section */}
			<Testimonials />
			{/* CTA Section */}
			<CTASection isLoggedIn={isLoggedIn} />
		</div>
	);
}
