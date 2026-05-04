import { Card } from "@/components/ui/card";

const FAQ = ({ faqs }) => {
	return (
		<div className="mt-12 max-w-4xl">
			<h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
				FAQ
			</h2>

			<div className="space-y-4">
				{faqs.map((q, index) => (
					<Card
						key={index}
						className="p-4 dark:bg-slate-900 dark:border-slate-800"
					>
						<h3 className="font-semibold text-slate-900 dark:text-white mb-2">
							{q.question}
						</h3>
						<p className="text-slate-600 dark:text-slate-400 text-sm">
							{q.answer}
						</p>
					</Card>
				))}
			</div>
		</div>
	);
};

export default FAQ;
