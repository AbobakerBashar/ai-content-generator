import { Star } from "lucide-react";

const Testimonials = () => {
	return (
		<section
			id="testimonials"
			className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
		>
			<div className="text-center mb-16">
				<h2 className="text-4xl md:text-5xl font-bold mb-4">
					Loved by Creators
				</h2>
				<p className="text-xl text-muted-foreground">
					See what our users have to say
				</p>
			</div>
			<div className="grid md:grid-cols-3 gap-8">
				<div className="p-6 rounded-xl border border-border bg-card">
					<div className="flex gap-1 mb-4">
						{[...Array(5)].map((_, i) => (
							<Star key={i} className="w-5 h-5 fill-primary text-primary" />
						))}
					</div>
					<p className="text-foreground mb-4">
						&quot;ContentAI has completely transformed how I create content.
						What used to take hours now takes minutes. Absolutely
						incredible!&quot;
					</p>
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
							<span className="font-semibold text-primary">SJ</span>
						</div>
						<div>
							<p className="font-semibold">Sarah Johnson</p>
							<p className="text-sm text-muted-foreground">Content Marketer</p>
						</div>
					</div>
				</div>
				<div className="p-6 rounded-xl border border-border bg-card">
					<div className="flex gap-1 mb-4">
						{[...Array(5)].map((_, i) => (
							<Star key={i} className="w-5 h-5 fill-primary text-primary" />
						))}
					</div>
					<p className="text-foreground mb-4">
						&quot;The quality of the AI-generated content is outstanding. It
						understands context and tone perfectly. A must-have tool for any
						writer.&quot;
					</p>
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
							<span className="font-semibold text-primary">MC</span>
						</div>
						<div>
							<p className="font-semibold">Michael Chen</p>
							<p className="text-sm text-muted-foreground">Blogger</p>
						</div>
					</div>
				</div>
				<div className="p-6 rounded-xl border border-border bg-card">
					<div className="flex gap-1 mb-4">
						{[...Array(5)].map((_, i) => (
							<Star key={i} className="w-5 h-5 fill-primary text-primary" />
						))}
					</div>
					<p className="text-foreground mb-4">
						&quot;As a social media manager, this tool has been a game-changer.
						I can create engaging posts across all platforms in no time.&quot;
					</p>
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
							<span className="font-semibold text-primary">EP</span>
						</div>
						<div>
							<p className="font-semibold">Emma Patel</p>
							<p className="text-sm text-muted-foreground">
								Social Media Manager
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
