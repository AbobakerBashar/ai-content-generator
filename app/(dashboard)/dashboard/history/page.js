import { getRecentGenerations } from "@/actions/generate";
import Filters from "@/components/dashboard/history/Filters";
import HistoryList from "@/components/dashboard/history/HistoryList";

export const metadata = {
	title: "Generation History",
	description: "View and manage your past generated content",
};

const getHistoryData = async () => {
	try {
		const history = await getRecentGenerations();
		return history;
	} catch (error) {
		throw new Error("Failed to fetch history data: " + error.message);
	}
};

export default async function HistoryPage() {
	const history = await getHistoryData();

	return (
		<div className="min-h-screen bg-white dark:bg-slate-950 p-4 sm:p-6 md:p-8">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
					Generation History
				</h1>
				<p className="text-slate-600 dark:text-slate-400">
					View and manage your past generated content
				</p>
			</div>

			{/* Filters */}
			<Filters />

			{/* History List */}

			<HistoryList history={history} />
		</div>
	);
}
