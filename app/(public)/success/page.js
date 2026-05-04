import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
	title: "Payment Successful - AI Content Generator",
	description: "Your payment has been processed successfully.",
};

async function SuccessContent({ sessionId }) {
	// In a real app, you would verify the session with Stripe
	// and update the user's plan in your database

	return (
		<div className="min-h-screen my-8 bg-linear-to-b from-background to-muted/20 flex items-center justify-center px-4">
			<Card className="max-w-2xl w-full border-primary/30 bg-card/50 backdrop-blur-sm">
				<CardHeader className="text-center">
					<div className="flex justify-center mb-4">
						<div className="rounded-full bg-green-100 dark:bg-green-950/30 p-4">
							<CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
						</div>
					</div>
					<CardTitle className="text-3xl">Payment Successful!</CardTitle>
					<CardDescription className="text-base mt-2">
						Your payment has been processed and your plan has been upgraded.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Success Details */}
					<div className="bg-accent/50 border border-border rounded-lg p-6 space-y-4">
						<div className="space-y-3">
							<div className="flex justify-between items-start">
								<span className="text-muted-foreground">Transaction ID:</span>
								<code className="text-sm bg-background px-2 py-1 rounded text-primary">
									{sessionId || "Processing..."}
								</code>
							</div>
							<div className="flex justify-between items-start">
								<span className="text-muted-foreground">Status:</span>
								<span className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
									<CheckCircle2 className="w-4 h-4" />
									Completed
								</span>
							</div>
							<div className="flex justify-between items-start">
								<span className="text-muted-foreground">Next Step:</span>
								<span className="text-foreground font-semibold">
									Activation in progress
								</span>
							</div>
						</div>
					</div>

					{/* What's Next */}
					<div className="space-y-3">
						<h3 className="font-semibold text-lg">What&apos;s Next?</h3>
						<ul className="space-y-2 text-muted-foreground">
							<li className="flex items-start gap-3">
								<span className="text-primary mt-0.5">✓</span>
								<span>Your new plan features are now active</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="text-primary mt-0.5">✓</span>
								<span>A confirmation email has been sent to your inbox</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="text-primary mt-0.5">✓</span>
								<span>You can start generating content immediately</span>
							</li>
						</ul>
					</div>

					{/* Info Box */}
					<div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
						<p className="text-sm text-blue-900 dark:text-blue-200">
							<span className="font-semibold">Need help?</span> Check your email
							for the receipt and instructions, or contact our support team.
						</p>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-3 pt-4">
						<Link href="/dashboard" className="flex-1">
							<Button className="w-full py-3 md:py-5 text-lg">
								Go to Dashboard
							</Button>
						</Link>
						<Link href="/dashboard/generate" className="flex-1">
							<Button variant="outline" className="w-full py-3 md:py-5 text-lg">
								Start Generating
							</Button>
						</Link>
					</div>

					{/* Footer Note */}
					<p className="text-xs text-muted-foreground text-center">
						Your subscription will renew automatically. You can manage your
						billing in Settings.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}

export default async function SuccessPage({ searchParams }) {
	const { session_id } = await searchParams;

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<SuccessContent sessionId={session_id} />
		</Suspense>
	);
}
