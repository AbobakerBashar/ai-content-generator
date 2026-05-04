"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Download, Loader2, RefreshCw } from "lucide-react";

const Output = ({
	generatedContent,
	isGenerating,
	contentType,
	setGeneratedContent,
}) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(generatedContent);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleDownload = () => {
		const element = document.createElement("a");
		const file = new Blob([generatedContent], { type: "text/plain" });
		element.href = URL.createObjectURL(file);
		element.download = `${contentType}-${Date.now()}.txt`;
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};

	return (
		<div className="w-full md:flex-1 bg-gray-50 dark:bg-slate-900 overflow-y-auto">
			<div className="p-4 sm:p-6 md:p-8 max-w-2xl">
				<h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
					Generated Content
				</h2>

				{generatedContent ? (
					<div className="space-y-4">
						{/* Output Card */}
						<Card className="p-6 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
							<p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
								{generatedContent}
							</p>
						</Card>

						{/* Action Buttons */}
						<div className="flex flex-col sm:flex-row gap-3">
							<Button
								onClick={handleCopy}
								className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
							>
								<Copy className="mr-2 h-4 w-4" />
								{copied ? "Copied!" : "Copy"}
							</Button>
							<Button
								onClick={handleDownload}
								className="flex-1 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
							>
								<Download className="mr-2 h-4 w-4" />
								Download
							</Button>
							<Button
								onClick={() => setGeneratedContent("")}
								variant="outline"
								className="sm:flex-none border-gray-300 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
							>
								<RefreshCw className="h-4 w-4" />
							</Button>
						</div>
					</div>
				) : (
					<div className="flex items-center justify-center h-64 sm:h-96 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-lg">
						<div className="text-gray-500 dark:text-gray-400">
							{isGenerating ? (
								<p className="flex flex-col items-center gap-2">
									<Loader2 className="h-8 w-8 animate-spin" />
									<span>Generating your content...</span>
								</p>
							) : (
								"Generated content will appear here"
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Output;
