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
					<CardTitle>Example Not Found</CardTitle>
					<CardDescription className="mt-2">
						We couldn&apos;t find that example. Try one of these instead:
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col md:flex-row gap-3">
						<Button className="flex-1">
							<Link href="/examples" className="flex items-center py-2 md:py-3">
								<LayoutDashboard className="h-4 w-4 mr-2" />
								Back to All Examples
							</Link>
						</Button>
						<Button variant="outline" className="flex-1">
							<Link href="/" className="flex items-center py-2 md:py-3">
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
