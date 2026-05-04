import { CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";
import VideoModal from "./DemoModal";

const Hero = ({ isLoggedIn }) => {
	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="text-center max-w-4xl mx-auto">
				<div className="inline-flex items-center gap-2 bg-accent px-4 py-2 rounded-full mb-6">
					<Zap className="w-4 h-4 text-accent-foreground" />
					<span className="text-sm text-accent-foreground">
						Powered by Advanced AI Technology
					</span>
				</div>
				<h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
					Generate Amazing Content in Seconds
				</h1>
				<p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
					Transform your ideas into professional content with our AI-powered
					platform. From blog posts to social media, we&apos;ve got you covered.
				</p>
				<div className="flex items-center justify-center gap-4">
					<Link
						href={isLoggedIn ? "/dashboard/generate" : "/auth/sign-up"}
						className="bg-primary text-primary-foreground px-8 h-10 md:h-12 rounded-lg text-lg hover:opacity-90 transition-opacity w-full sm:w-auto inline-flex items-center gap-2 justify-center"
					>
						{isLoggedIn && <Zap className="w-5 h-5" />}
						{isLoggedIn ? "Generate" : "Get Started for Free"}
					</Link>
					<VideoModal />
				</div>
				<div className="flex items-center justify-center gap-6 mt-12 text-sm text-muted-foreground">
					<div className="flex items-center gap-2">
						<CheckCircle2 className="w-5 h-5 text-primary" />
						<span>No credit card required</span>
					</div>
					<div className="flex items-center gap-2">
						<CheckCircle2 className="w-5 h-5 text-primary" />
						<span>Free trial included</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
