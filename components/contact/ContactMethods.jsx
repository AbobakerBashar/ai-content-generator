import Link from "next/link";

const ContactMethods = ({ contactMethods }) => {
	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-6xl mx-auto">
				<div className="grid md:grid-cols-4 gap-6 mb-20">
					{contactMethods.map((method, index) => (
						<Link
							key={index}
							href={method.link}
							className="bg-card backdrop-blur border border-border rounded-xl p-6 hover:border-primary transition-colors group"
						>
							<div className="text-primary transition-colors mb-4">
								{method.icon}
							</div>
							<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
								{method.title}
							</h3>
							<p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
								{method.description}
							</p>
							<p className="text-gray-700 dark:text-gray-300 font-semibold text-sm">
								{method.detail}
							</p>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default ContactMethods;
