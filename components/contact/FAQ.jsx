import { Card } from "../ui/card";

const FAQ = () => {
	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				<h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
					Frequently Asked Questions
				</h2>

				<div className="space-y-4">
					{[
						{
							q: "What is your response time?",
							a: "We typically respond to all inquiries within 24 hours during business days (Monday-Friday, 9 AM - 6 PM PST).",
						},
						{
							q: "How can I report a bug or technical issue?",
							a: "Please contact our support team at support@aicontentgen.com with detailed information about the issue, including screenshots if possible.",
						},
						{
							q: "Do you offer enterprise solutions?",
							a: "Yes! We offer custom enterprise plans for large organizations. Contact our sales team to discuss your specific needs.",
						},
						{
							q: "Can I schedule a demo or call?",
							a: "Absolutely! Reach out to us via email and we'll schedule a convenient time to showcase our platform.",
						},
						{
							q: "Where is your company located?",
							a: "We're based in San Francisco, California, but our team works remotely to serve customers across the globe.",
						},
						{
							q: "Do you have a community or user forum?",
							a: "We're building our community! Check back soon for forums, user groups, and networking opportunities.",
						},
					].map((faq, index) => (
						<Card
							key={index}
							className="p-6 hover:border-purple-400 dark:hover:border-purple-500/30 transition-colors"
						>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
								{faq.q}
							</h3>
							<p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};

export default FAQ;
