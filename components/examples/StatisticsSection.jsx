const StatisticsSection = () => {
	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
			<h2 className="text-4xl font-bold text-center mb-16">By The Numbers</h2>
			<div className="grid md:grid-cols-4 gap-8">
				<div className="text-center">
					<p className="text-5xl font-bold text-primary mb-2">50M+</p>
					<p className="text-lg text-muted-foreground">Words Generated</p>
				</div>
				<div className="text-center">
					<p className="text-5xl font-bold text-primary mb-2">10K+</p>
					<p className="text-lg text-muted-foreground">Active Users</p>
				</div>
				<div className="text-center">
					<p className="text-5xl font-bold text-primary mb-2">95%</p>
					<p className="text-lg text-muted-foreground">User Satisfaction</p>
				</div>
				<div className="text-center">
					<p className="text-5xl font-bold text-primary mb-2">24/7</p>
					<p className="text-lg text-muted-foreground">Support Available</p>
				</div>
			</div>
		</section>
	);
};

export default StatisticsSection;
