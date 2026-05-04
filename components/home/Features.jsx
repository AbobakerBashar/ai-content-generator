import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
	CheckCircle2,
	Shield,
	Sparkles,
	Star,
	TrendingUp,
	Zap,
} from "lucide-react";

const Features = () => {
	return (
		<section
			id="features"
			className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-card/50 rounded-3xl my-12 border"
		>
			<div className="text-center mb-16">
				<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
					Powerful Features
				</h2>
				<p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
					Everything you need to create exceptional content
				</p>
			</div>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
				<Card className="group border-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-card hover:bg-card/80">
					<CardHeader className="pb-4">
						<div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-400 border border-primary/20">
							<Sparkles className="w-7 h-7 text-primary group-hover:rotate-12 transition-all" />
						</div>
						<CardTitle className="text-xl lg:text-2xl font-bold group-hover:text-primary transition-colors">
							AI-Powered Generation
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-foreground/90 leading-relaxed text-base">
							Advanced AI models trained on billions of high-quality content
							pieces to deliver exceptional results.
						</p>
					</CardContent>
				</Card>
				<Card className="group border-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-card hover:bg-card/80">
					<CardHeader className="pb-4">
						<div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-400 border border-primary/20">
							<Zap className="w-7 h-7 text-primary group-hover:rotate-12 transition-all" />
						</div>
						<CardTitle className="text-xl lg:text-2xl font-bold group-hover:text-primary transition-colors">
							Lightning Fast
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-foreground/90 leading-relaxed text-base">
							Generate complete articles, posts, and content in seconds. Save
							hours of writing time.
						</p>
					</CardContent>
				</Card>
				<Card className="group border-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-card hover:bg-card/80">
					<CardHeader className="pb-4">
						<div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-400 border border-primary/20">
							<Shield className="w-7 h-7 text-primary group-hover:rotate-12 transition-all" />
						</div>
						<CardTitle className="text-xl lg:text-2xl font-bold group-hover:text-primary transition-colors">
							100% Original
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-foreground/90 leading-relaxed text-base">
							All content is unique and plagiarism-free. Perfect for SEO and
							authentic engagement.
						</p>
					</CardContent>
				</Card>
				<Card className="group border-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-card hover:bg-card/80">
					<CardHeader className="pb-4">
						<div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-400 border border-primary/20">
							<TrendingUp className="w-7 h-7 text-primary group-hover:rotate-12 transition-all" />
						</div>
						<CardTitle className="text-xl lg:text-2xl font-bold group-hover:text-primary transition-colors">
							SEO Optimized
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-foreground/90 leading-relaxed text-base">
							Built-in SEO optimization ensures your content ranks higher and
							reaches more people.
						</p>
					</CardContent>
				</Card>
				<Card className="group border-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-card hover:bg-card/80">
					<CardHeader className="pb-4">
						<div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-400 border border-primary/20">
							<CheckCircle2 className="w-7 h-7 text-primary group-hover:rotate-12 transition-all" />
						</div>
						<CardTitle className="text-xl lg:text-2xl font-bold group-hover:text-primary transition-colors">
							Multiple Formats
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-foreground/90 leading-relaxed text-base">
							Blog posts, social media, emails, ads, and more. One tool for all
							your content needs.
						</p>
					</CardContent>
				</Card>
				<Card className="group border-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-card hover:bg-card/80">
					<CardHeader className="pb-4">
						<div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-400 border border-primary/20">
							<Star className="w-7 h-7 text-primary group-hover:rotate-12 transition-all" />
						</div>
						<CardTitle className="text-xl lg:text-2xl font-bold group-hover:text-primary transition-colors">
							Brand Voice
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-foreground/90 leading-relaxed text-base">
							Customize tone and style to match your brand perfectly. Consistent
							quality every time.
						</p>
					</CardContent>
				</Card>
			</div>
		</section>
	);
};

export default Features;
