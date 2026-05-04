"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

const ContentSection = ({ content }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(content);
		setCopied(true);
		const timer = setTimeout(() => setCopied(false), 2000);
		return () => clearTimeout(timer);
	};

	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div className="bg-card border border-border rounded-2xl overflow-hidden">
				<div className="bg-muted/50 border-b border-border p-6 flex items-center justify-between">
					<h2 className="text-xl font-bold text-foreground">
						Generated Content
					</h2>
					<button
						onClick={handleCopy}
						className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors font-semibold"
					>
						{copied ? (
							<>
								<Check className="w-4 h-4" />
								Copied!
							</>
						) : (
							<>
								<Copy className="w-4 h-4" />
								Copy
							</>
						)}
					</button>
				</div>

				<div className="p-8 prose prose-invert max-w-none">
					<div className="text-foreground whitespace-pre-wrap leading-relaxed">
						{content}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContentSection;
