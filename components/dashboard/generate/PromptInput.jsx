import { Textarea } from "@/components/ui/textarea";

const PromptInput = ({ prompt, setPrompt, isGenerating }) => {
	return (
		<div className="mb-6">
			<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
				Your Prompt
			</label>
			<Textarea
				placeholder="Describe what you want to generate..."
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
				className="min-h-48 resize-none"
				disabled={isGenerating}
			/>
			<div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
				{prompt.length} characters
			</div>
		</div>
	);
};

export default PromptInput;
