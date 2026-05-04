import { BookOpen, Share2, Zap } from "lucide-react";

const BenefitsSection = () => {
	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
				Why This Example Stands Out
			</h2>

			<div className="grid md:grid-cols-3 gap-6">
				<div className="bg-card border border-border rounded-xl p-6">
					<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
						<Zap className="w-6 h-6 text-primary" />
					</div>
					<h3 className="text-xl font-bold mb-2 text-foreground">
						Quick Generation
					</h3>
					<p className="text-muted-foreground">
						Generated in seconds, not hours. Save time on content creation while
						maintaining quality.
					</p>
				</div>

				<div className="bg-card border border-border rounded-xl p-6">
					<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
						<BookOpen className="w-6 h-6 text-primary" />
					</div>
					<h3 className="text-xl font-bold mb-2 text-foreground">
						High Quality
					</h3>
					<p className="text-muted-foreground">
						Production-ready content. Minimal editing required. SEO optimized
						and engaging.
					</p>
				</div>

				<div className="bg-card border border-border rounded-xl p-6">
					<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
						<Share2 className="w-6 h-6 text-primary" />
					</div>
					<h3 className="text-xl font-bold mb-2 text-foreground">
						Ready to Use
					</h3>
					<p className="text-muted-foreground">
						Copy, paste, and publish. Or customize to match your brand voice.
					</p>
				</div>
			</div>
		</div>
	);
};

export default BenefitsSection;
