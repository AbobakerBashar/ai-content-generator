"use client";

import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Filters = ({}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const router = useRouter();
	const searchParams = useSearchParams();
	const term = searchParams.get("term");
	const type = searchParams.get("type") || "all";

	useEffect(() => {
		const timer = setTimeout(() => {
			if (searchTerm === "") {
				router.push("/dashboard/history");
				return;
			}
			if (type && type !== "all")
				router.push("/dashboard/history?term=" + searchTerm + "&type=" + type);
			else router.push("/dashboard/history?term=" + searchTerm);
		}, 500);
		return () => clearTimeout(timer);
	}, [searchTerm, type, router]);

	const handleContentFilterChange = (value) => {
		if (value === "all") {
			router.push("/dashboard/history");
			return;
		}
		if (term) router.push("/dashboard/history?term=" + term + "&type=" + value);
		else router.push("/dashboard/history?type=" + value);
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 max-w-4xl">
			<div>
				<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
					Search
				</label>
				<div className="relative flex items-center w-full">
					<Search className="absolute left-3 w-5 h-5 text-slate-400" />

					<Input
						placeholder="Search by title or prompt..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-10 dark:bg-slate-900 dark:border-slate-700 dark:text-white"
					/>
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
					Content Type
				</label>
				<Select value={type} onValueChange={handleContentFilterChange}>
					<SelectTrigger className="dark:bg-slate-900 dark:border-slate-700 dark:text-white">
						<SelectValue>
							{type.charAt(0).toUpperCase() + type.slice(1)}
						</SelectValue>
					</SelectTrigger>
					<SelectContent className="dark:bg-slate-900 dark:border-slate-700">
						<SelectItem value="all">All Types</SelectItem>
						<SelectItem value="blog">Blog Post</SelectItem>
						<SelectItem value="social media">Social Media</SelectItem>
						<SelectItem value="email">Email</SelectItem>
						<SelectItem value="ad copy">Ad Copy</SelectItem>
						<SelectItem value="product description">
							Product Description
						</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

export default Filters;
