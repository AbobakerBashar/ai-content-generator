import { getExamples } from "@/actions/examples";
import CATSection from "@/components/examples/CATSection";
import Examples from "@/components/examples/Examples";
import ExamplesHeader from "@/components/examples/ExamplesHeader";
import ShowCaseSection from "@/components/examples/ShowCaseSection";
import StatisticsSection from "@/components/examples/StatisticsSection";
import { Suspense } from "react";

export const metadata = {
	title: "Examples",
	description:
		"Explore a variety of examples showcasing our capabilities and solutions.",
};

const fetchExamples = async () => {
	try {
		const examples = await getExamples();
		return examples;
	} catch (error) {
		throw new Error("Failed to load examples");
	}
};
const ExamplesPage = async () => {
	const examples = await fetchExamples();

	const ids = examples.map((example) => ({
		type: example.type,
		id: example.id,
	}));

	return (
		<div className="min-h-screen bg-linear-to-b from-background to-muted/20">
			{/* Page Header */}
			<ExamplesHeader />

			{/* Examples Section */}
			<Examples examples={examples} />

			{/* Showcase Section */}
			<ShowCaseSection ids={ids} />

			{/* Statistics Section */}
			<StatisticsSection />
			{/* CTA Section */}
			<CATSection />
		</div>
	);
};

export default ExamplesPage;
