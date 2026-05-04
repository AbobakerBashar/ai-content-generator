import Features from "@/components/home/Features";

export const metadata = {
	title: "Features",
	description:
		"Discover the powerful features of our AI content generator that set us apart from the competition.",
};

const FeaturePage = () => {
	return (
		<div className="min-h-screen bg-linear-to-b from-background to-muted/20">
			{/* Page Header */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
				<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
					Powerful Features
				</h1>
				<p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
					Discover everything our AI-powered content generator can do for you.
					From lightning-fast generation to brand voice customization, we have
					all the tools you need.
				</p>
			</div>

			{/* Features Grid */}
			<Features />

			{/* Additional Information Section */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
				<div className="grid md:grid-cols-2 gap-12 lg:gap-16">
					<div>
						<h3 className="text-3xl md:text-4xl font-bold mb-6">
							Why Choose Our Platform?
						</h3>
						<ul className="space-y-4">
							<li className="flex gap-4">
								<span className="text-primary text-2xl shrink-0">✓</span>
								<div>
									<h4 className="font-semibold text-lg mb-1">
										State-of-the-Art AI
									</h4>
									<p className="text-muted-foreground">
										Built on the latest GPT-4 and proprietary models for
										unmatched quality
									</p>
								</div>
							</li>
							<li className="flex gap-4">
								<span className="text-primary text-2xl shrink-0">✓</span>
								<div>
									<h4 className="font-semibold text-lg mb-1">
										Unlimited Customization
									</h4>
									<p className="text-muted-foreground">
										Fine-tune every aspect from tone to length to formatting
									</p>
								</div>
							</li>
							<li className="flex gap-4">
								<span className="text-primary text-2xl shrink-0">✓</span>
								<div>
									<h4 className="font-semibold text-lg mb-1">
										Real-Time Collaboration
									</h4>
									<p className="text-muted-foreground">
										Work with your team in real-time and share drafts instantly
									</p>
								</div>
							</li>
							<li className="flex gap-4">
								<span className="text-primary text-2xl shrink-0">✓</span>
								<div>
									<h4 className="font-semibold text-lg mb-1">
										Advanced Analytics
									</h4>
									<p className="text-muted-foreground">
										Track performance and optimize your content strategy with
										detailed insights
									</p>
								</div>
							</li>
						</ul>
					</div>
					<div className="bg-card rounded-3xl p-8 border border-border">
						<h3 className="text-2xl font-bold mb-6">Getting Started is Easy</h3>
						<ol className="space-y-6">
							<li className="flex gap-4">
								<div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold shrink-0">
									1
								</div>
								<div>
									<h4 className="font-semibold mb-1">Sign Up</h4>
									<p className="text-muted-foreground">
										Create your free account in seconds
									</p>
								</div>
							</li>
							<li className="flex gap-4">
								<div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold shrink-0">
									2
								</div>
								<div>
									<h4 className="font-semibold mb-1">Choose Content Type</h4>
									<p className="text-muted-foreground">
										Select from 20+ content types
									</p>
								</div>
							</li>
							<li className="flex gap-4">
								<div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold shrink-0">
									3
								</div>
								<div>
									<h4 className="font-semibold mb-1">Provide Details</h4>
									<p className="text-muted-foreground">
										Tell us about your topic and preferences
									</p>
								</div>
							</li>
							<li className="flex gap-4">
								<div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold shrink-0">
									4
								</div>
								<div>
									<h4 className="font-semibold mb-1">Generate & Download</h4>
									<p className="text-muted-foreground">
										Get your content in seconds, ready to use
									</p>
								</div>
							</li>
						</ol>
					</div>
				</div>
			</section>
		</div>
	);
};

export default FeaturePage;
