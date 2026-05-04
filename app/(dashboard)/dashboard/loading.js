import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DashboardLoading() {
	return (
		<div className="space-y-6">
			{/* Header Skeleton */}
			<div className="space-y-2">
				<div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
				<div className="h-4 w-72 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
			</div>

			{/* Stats Grid Skeleton */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{[...Array(4)].map((_, i) => (
					<Card key={i}>
						<CardHeader className="pb-3">
							<div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
						</CardHeader>
						<CardContent>
							<div className="space-y-2">
								<div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
								<div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Recent Activity Skeleton */}
			<Card>
				<CardHeader>
					<div className="h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
				</CardHeader>
				<CardContent className="space-y-4">
					{[...Array(3)].map((_, i) => (
						<div key={i} className="space-y-2 pb-4 border-b last:border-b-0">
							<div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
							<div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}
