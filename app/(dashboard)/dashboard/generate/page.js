"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

import ContentTypeSelector from "@/components/dashboard/generate/ContentTypeSelector";
import Output from "@/components/dashboard/generate/Output";
import PromptInput from "@/components/dashboard/generate/PromptInput";
import Tips from "@/components/dashboard/generate/Tips";
import { Loader2 } from "lucide-react";
import { useGenerate } from "@/hooks/generate";
import { useGetUser } from "@/hooks/users";

// export const metadata = {
// 	title: "Generate Content",
// 	description: "Use AI to generate content for your business",
// };

export default function GeneratePage() {
	const [contentType, setContentType] = useState("blog");
	const [prompt, setPrompt] = useState("10 tips for better studying");
	const [generatedContent, setGeneratedContent] = useState("");

	const { generate, isGenerating, error } = useGenerate();

	const handleGenerate = async () => {
		try {
			const result = await generate({ prompt, content_type: contentType });
			setGeneratedContent(result.content);
		} catch (error) {
			console.log("Generation failed:", error.message);
		}
	};
	const handleClear = () => {
		setPrompt("");
		setGeneratedContent("");
	};

	return (
		<section className="flex flex-col md:flex-row min-h-screen bg-card shadow-sm ">
			{/* Left Side - Input Section */}
			<div className="w-full md:flex-1 border-b md:border-b-0 md:border-r border-border overflow-y-auto">
				<div className="p-4 sm:p-6 md:p-8 max-w-2xl">
					<h1 className="text-2xl sm:text-3xl font-bold mb-2">
						Generate Content
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mb-8">
						Use AI to create engaging content for your business
					</p>

					{/* Content Type Selector */}
					<ContentTypeSelector
						contentType={contentType}
						setContentType={setContentType}
					/>

					{/* Prompt Input */}
					<PromptInput
						prompt={prompt}
						setPrompt={setPrompt}
						isGenerating={isGenerating}
					/>

					{/* Error Message */}
					{error && (
						<div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
							<p className="text-sm text-red-600 dark:text-red-400">
								{error.message}
							</p>
						</div>
					)}

					{/* Generate Button */}
					<Button
						onClick={handleGenerate}
						disabled={isGenerating || !prompt.trim()}
						className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800"
					>
						{isGenerating ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Generating...
							</>
						) : (
							"Generate Content"
						)}
					</Button>

					{/* Clear Button */}
					<Button
						onClick={handleClear}
						variant="outline"
						className="w-full border-gray-300 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
					>
						Clear
					</Button>

					{/* Tips Section */}
					<Tips />
				</div>
			</div>

			{/* Right Side - Output Section */}
			<Output
				generatedContent={generatedContent}
				isGenerating={isGenerating}
				contentType={contentType}
				setGeneratedContent={setGeneratedContent}
			/>
		</section>
	);
}
