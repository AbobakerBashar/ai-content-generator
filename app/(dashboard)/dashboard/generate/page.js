import { Suspense } from "react";
export const dynamic = "force-dynamic";

import GenerateComponent from "@/components/dashboard/generate/GenerateComponent";

export const metadata = {
	title: "Generate Content - AI Content Generator",
	description:
		"Use our AI-powered content generator to create engaging blog posts, social media updates, emails, and more in seconds.",
};

export default function GeneratePage() {
	return (
		<section className="flex flex-col md:flex-row min-h-screen bg-card shadow-sm ">
			<Suspense>
				<GenerateComponent />
			</Suspense>
		</section>
	);
}
