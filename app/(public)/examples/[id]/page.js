import { getExampleById } from "@/actions/examples";
import BenefitsSection from "@/components/examples/BenefitsSection";
import ContentSection from "@/components/examples/ContentSection";
import RelatedExamples from "@/components/examples/RelatedExamples";
import SingleCATSection from "@/components/examples/SingleCATSection";
import SingleHeader from "@/components/examples/SingleHeader";
import Testimonail from "@/components/examples/Testimonail";
import { supabase } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
	const { data: examples, error } = await supabase
		.from("examples")
		.select("id");
	if (error) {
		return [];
	}
	return examples.map((example) => ({ id: example.id }));
}

export const metadata = {
	title: "Example Details",
	description: "Detailed view of the selected example",
};

const fetchExample = async (id) => {
	try {
		const example = await getExampleById(id);
		if (!example) {
			return notFound();
		}
		return example;
	} catch (error) {
		notFound();
	}
};

export default async function ExampleDetailPage({ params }) {
	const { id } = (await params) || "blog";
	const example = await fetchExample(id);

	return (
		<div className="min-h-screen bg-linear-to-b from-background to-muted/20">
			{/* Header */}
			<SingleHeader example={example} />

			{/* Content Section */}
			<ContentSection content={example.content} />

			{/* Testimonial */}
			<Testimonail testimonial={example.testimonial} />

			{/* Benefits Section */}
			<BenefitsSection />

			{/* Related Examples */}
			<RelatedExamples exampleId={id} />

			{/* CTA Section */}
			<SingleCATSection />
		</div>
	);
}
