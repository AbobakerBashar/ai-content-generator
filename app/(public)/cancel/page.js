import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
	title: "Payment Cancelled - AI Content Generator",
	description: "Your payment has been cancelled.",
};

export default function CancelPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center px-4">
			<Card className="max-w-2xl w-full border-amber-200 dark:border-amber-800">
				<CardHeader className="text-center">
					<div className="flex justify-center mb-4">
						<div className="rounded-full bg-amber-100 dark:bg-amber-950/30 p-4">
							<AlertCircle className="w-12 h-12 text-amber-600 dark:text-amber-400" />
						</div>
					</div>
					<CardTitle className="text-3xl">Payment Cancelled</CardTitle>
					<CardDescription className="text-base mt-2">
						Your payment was cancelled. Your plan remains unchanged.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Info Box */}
					<div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
						<p className="text-sm text-amber-900 dark:text-amber-200">
							Your checkout session has been cancelled. No payment has been
							charged to your account.
						</p>
					</div>

					{/* What Happened */}
					<div className="space-y-3">
						<h3 className="font-semibold text-lg">What Happened?</h3>
						<p className="text-muted-foreground">
							You closed the payment page or your session expired. You can try
							upgrading again anytime.
						</p>
					</div>

					{/* Current Plan Info */}
					<div className="bg-accent/50 border border-border rounded-lg p-4">
						<p className="text-sm text-muted-foreground">
							Your current plan features are still available. You can continue
							using them, or retry the upgrade process.
						</p>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-3 pt-4">
						<Link href="/dashboard/checkout" className="flex-1">
							<Button className="w-full py-6 text-lg">Try Again</Button>
						</Link>
						<Link href="/dashboard" className="flex-1">
							<Button variant="outline" className="w-full py-6 text-lg">
								<ArrowLeft className="w-4 h-4 mr-2" />
								Back to Dashboard
							</Button>
						</Link>
					</div>

					{/* Support */}
					<div className="border-t border-border pt-4">
						<p className="text-sm text-muted-foreground">
							Need help?{" "}
							<Link href="/contact" className="text-primary hover:underline">
								Contact us
							</Link>{" "}
							and we'll be happy to assist.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
