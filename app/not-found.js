import { FileQuestion, Home, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex items-center justify-center min-h-screen p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="flex justify-center mb-4">
						<FileQuestion className="h-12 w-12 text-amber-500" />
					</div>
					<CardTitle>Page Not Found</CardTitle>
					<CardDescription className="mt-2">
						The page you&apos;re looking for doesn&apos;t exist in your
						dashboard.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
						<p className="text-sm text-amber-800 dark:text-amber-200">
							Error 404: The requested resource could not be found
						</p>
					</div>
					<div className="flex flex-col md:flex-row gap-3">
						<Button className="flex-1" size="sm">
							<Link href="/dashboard" className="flex items-center py-2">
								<LayoutDashboard className="h-4 w-4 mr-2" />
								Back to Dashboard
							</Link>
						</Button>
						<Button variant="outline" size="sm" className="flex-1">
							<Link href="/" className="flex items-center py-2">
								<Home className="h-4 w-4 mr-2" />
								Home
							</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
