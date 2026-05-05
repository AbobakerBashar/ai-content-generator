"use client";

import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function PublicErrorPage({ error, reset }) {
	return (
		<div className="flex items-center justify-center min-h-screen p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="flex justify-center mb-4">
						<AlertCircle className="h-12 w-12 text-red-500" />
					</div>
					<CardTitle>Oops! Something went wrong</CardTitle>
					<CardDescription className="mt-2">
						We encountered an error while loading your dashboard. Please try
						again.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
						<p className="text-sm text-red-800 dark:text-red-200 wrap-break-word">
							{error?.message || "An unexpected error occurred"}
						</p>
					</div>
					<div className="flex gap-3">
						<Button onClick={() => reset()} className="flex-1" size="sm">
							<RotateCcw className="h-4 w-4 mr-2" />
							Try Again
						</Button>
						<Button variant="outline" size="sm" className="flex-1" asChild>
							<Link href="/dashboard">Go to Dashboard</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
