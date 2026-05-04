const FAQSection = () => {
	return (
		<section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
			<h2 className="text-4xl font-bold text-center mb-16">
				Frequently Asked Questions
			</h2>
			<div className="space-y-8">
				<div className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow">
					<h3 className="text-xl font-bold mb-3 text-foreground">
						Can I cancel my subscription anytime?
					</h3>
					<p className="text-muted-foreground">
						Yes, you can cancel your subscription at any time. Your access will
						continue until the end of your billing cycle, and you won&apos;t be
						charged again.
					</p>
				</div>
				<div className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow">
					<h3 className="text-xl font-bold mb-3 text-foreground">
						What happens to my content if I cancel?
					</h3>
					<p className="text-muted-foreground">
						All your generated content and history will remain accessible even
						after cancellation. You can download your content anytime.
					</p>
				</div>
				<div className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow">
					<h3 className="text-xl font-bold mb-3 text-foreground">
						Do you offer discounts for annual billing?
					</h3>
					<p className="text-muted-foreground">
						Yes! Pay annually and save 20% on all plans. Contact our sales team
						for custom enterprise pricing.
					</p>
				</div>
				<div className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow">
					<h3 className="text-xl font-bold mb-3 text-foreground">
						What&apos;s included in the free trial?
					</h3>
					<p className="text-muted-foreground">
						The 7-day free trial gives you full access to all Pro features. No
						credit card required to start.
					</p>
				</div>
				<div className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow">
					<h3 className="text-xl font-bold mb-3 text-foreground">
						Can I upgrade or downgrade my plan?
					</h3>
					<p className="text-muted-foreground">
						Absolutely! You can change your plan anytime. We&apos;ll pro-rate
						any adjustments to your billing.
					</p>
				</div>
				<div className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow">
					<h3 className="text-xl font-bold mb-3 text-foreground">
						Do you offer API access for developers?
					</h3>
					<p className="text-muted-foreground">
						Yes! Enterprise and Pro plans include API access. Contact us to
						discuss your integration needs.
					</p>
				</div>
			</div>
		</section>
	);
};

export default FAQSection;
