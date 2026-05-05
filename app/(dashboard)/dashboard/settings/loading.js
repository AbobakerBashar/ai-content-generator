import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SettingsLoading() {
	return (
		<div className="space-y-6">
			<div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-4" />
			<Card>
				<CardHeader>
					<div className="h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
				</CardHeader>
				<CardContent className="space-y-4">
					{[...Array(4)].map((_, i) => (
						<div
							key={i}
							className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-2"
						/>
					))}
				</CardContent>
			</Card>
		</div>
	);
}
