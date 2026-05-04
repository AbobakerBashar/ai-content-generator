import { Card, CardTitle } from "@/components/ui/card";

const Tips = () => {
	return (
		<Card className="mt-8 p-6 bg-blue-50 dark:bg-slate-900 border-blue-200 dark:border-slate-800">
			<CardTitle className="font-semibold mb-3">
				💡 Tips for Better Results
			</CardTitle>
			<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
				<li>• Be specific about your target audience</li>
				<li>• Include key details and context</li>
				<li>• Specify tone (professional, casual, creative)</li>
				<li>• Mention any requirements or constraints</li>
				<li>• Review and edit the generated content</li>
			</ul>
		</Card>
	);
};

export default Tips;
