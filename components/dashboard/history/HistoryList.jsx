"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDeleteGeneration } from "@/hooks/generate";
import { BookOpen, Copy, Download, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const getTypeColor = (type) => {
	const colors = {
		blog: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100",
		"social media":
			"bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-100",
		email:
			"bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100",
		"ad-copy":
			"bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100",
		"product-description":
			"bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100",
	};
	return (
		colors[type] ||
		"bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
	);
};

const getTypeLabel = (type) => {
	return type?.charAt(0).toUpperCase() + type?.slice(1).toLowerCase();
};

const HistoryList = ({ history }) => {
	const searchParams = useSearchParams();
	const searchTerm = searchParams.get("term") || "";
	const contentFilter = searchParams.get("type") || "all";
	const [readMoreId, setReadMoreId] = useState(null);

	const { deleteGeneration, isDeleting } = useDeleteGeneration();

	const filteredHistory = history.filter((item) => {
		const matchesSearch =
			!searchTerm ||
			item.prompt.toLowerCase?.()?.includes(searchTerm.toLowerCase());
		const matchesFilter =
			contentFilter === "all" || item.content_type === contentFilter;
		return matchesSearch && matchesFilter;
	});

	const handleCopy = (content) => {
		navigator.clipboard.writeText(content);
	};

	const handleDownload = (title, content) => {
		const element = document.createElement("a");
		const file = new Blob([content], { type: "text/plain" });

		const url = URL.createObjectURL(file);
		element.href = url;
		element.download = `${title.replace(/\s+/g, "_")}.txt`;

		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);

		URL.revokeObjectURL(url);
	};

	const handleDelete = async (id) => {
		await deleteGeneration(id);
	};

	return (
		<>
			<p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
				Showing {filteredHistory.length} result
				{filteredHistory.length !== 1 ? "s" : ""}
			</p>
			{filteredHistory.length === 0 ? (
				<Card className="p-12 text-center dark:bg-slate-900 dark:border-slate-800">
					<p className="text-slate-600 dark:text-slate-400">No results found</p>
				</Card>
			) : (
				<div className="space-y-4 max-w-4xl">
					{filteredHistory.map((item) => (
						<Card
							key={item.id}
							className="p-4 sm:p-6 dark:bg-slate-900 dark:border-slate-800 hover:shadow-lg transition-shadow"
						>
							<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
								<div className="flex-1">
									<div className="flex flex-wrap items-center gap-2 mb-2">
										<h3 className="text-lg font-semibold text-slate-900 dark:text-white">
											{item.prompt.length > 50
												? item.prompt.slice(0, 50) + "..."
												: item.prompt}
										</h3>
										<Badge className={getTypeColor(item.content_type)}>
											{getTypeLabel(item.content_type)}
										</Badge>
									</div>
									<p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
										{item.prompt}
									</p>
									<div className="flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
										<span>{item.created_at}</span>
										<span>•</span>
										<span>{item.content?.length} words</span>
									</div>
								</div>
							</div>

							{/* Content Preview */}
							<div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg mb-4">
								<p
									className={`text-sm text-slate-700 dark:text-slate-300 ${readMoreId && readMoreId === item.id ? "" : "line-clamp-3"}`}
								>
									{item.content}
								</p>
							</div>

							{/* Action Buttons */}
							<div className="flex flex-wrap gap-2">
								<Button
									size="sm"
									variant="outline"
									className="dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
									onClick={() => handleCopy(item.content)}
								>
									<Copy className="w-4 h-4 mr-1" />
									Copy
								</Button>
								<Button
									size="sm"
									variant="outline"
									className="dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
									onClick={() => handleDownload(item.prompt, item.content)}
								>
									<Download className="w-4 h-4 mr-1" />
									Download
								</Button>
								<Button
									disabled={isDeleting}
									size="sm"
									variant="outline"
									className="dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950 ml-auto"
									onClick={() => handleDelete(item.id)}
								>
									{isDeleting ? (
										<div className="flex items-center gap-1.5">
											<span className="loader border-dotted w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" />
											<span>Deletting</span>
										</div>
									) : (
										<>
											<Trash2 className="w-4 h-4 mr-1" />
											Delete
										</>
									)}
								</Button>
								<Button
									size="sm"
									variant="outline"
									className="dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
									onClick={() =>
										setReadMoreId(readMoreId === item.id ? null : item.id)
									}
								>
									{!readMoreId || readMoreId !== item.id ? (
										<>
											<BookOpen className="w-4 h-4 mr-1" />
											Read More
										</>
									) : (
										<span>Read Less</span>
									)}
								</Button>
							</div>
						</Card>
					))}
				</div>
			)}
		</>
	);
};

export default HistoryList;
