import Link from "next/link";

const CATSection = () => {
	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border-t border-gray-200 dark:border-slate-700">
			<div className="max-w-4xl mx-auto text-center">
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
					Not ready to contact us yet?
				</h2>
				<p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
					Learn more about our features or start creating content for free
					today.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link
						href="/features"
						className="px-8 py-3 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-gray-300 rounded-lg font-semibold hover:border-gray-400 dark:hover:border-slate-400 transition-colors"
					>
						Explore Features
					</Link>
					<Link
						href="/dashboard/generate"
						className="px-8 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
					>
						Start Creating
					</Link>
				</div>
			</div>
		</section>
	);
};

export default CATSection;
