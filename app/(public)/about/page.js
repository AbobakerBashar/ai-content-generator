import { ArrowRight, BookOpen, Target, Users, Zap } from "lucide-react";
import Link from "next/link";

export const metadata = {
	title: "About Us - AI Content Generator",
	description:
		"Learn about our mission, vision, and the team behind AI Content Generator. Discover how we're revolutionizing content creation with AI technology.",
};

const team = [
	{
		name: "Innovation Team",
		role: "AI & Development",
		description: "Building cutting-edge AI content generation technology",
		icon: "🤖",
	},
	{
		name: "Content Team",
		role: "Strategy & Creativity",
		description: "Creating templates and strategies for every content type",
		icon: "✍️",
	},
	{
		name: "Support Team",
		role: "Customer Success",
		description: "Helping users maximize their content creation potential",
		icon: "🤝",
	},
];

const milestones = [
	{ year: "2024", achievement: "Platform Launch" },
	{ year: "2024", achievement: "10K+ Active Users" },
	{ year: "2025", achievement: "1M+ Content Generated" },
	{ year: "2026", achievement: "Enterprise Features" },
];

const values = [
	{
		icon: <Zap className="w-8 h-8 text-blue-500" />,
		title: "Speed & Efficiency",
		description: "Generate professional content in seconds, not hours",
	},
	{
		icon: <Users className="w-8 h-8 text-purple-500" />,
		title: "Accessibility",
		description: "AI-powered tools for creators of all skill levels",
	},
	{
		icon: <Target className="w-8 h-8 text-pink-500" />,
		title: "Quality First",
		description: "Consistently deliver high-quality, brand-aligned content",
	},
	{
		icon: <BookOpen className="w-8 h-8 text-green-500" />,
		title: "Continuous Learning",
		description: "Improve your skills with AI-powered insights and feedback",
	},
];

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-linear-to-b from-white via-gray-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
			{/* Hero Section */}
			<section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6">
						About AI Content Generator
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
						Empowering creators, marketers, and businesses to produce
						exceptional content at scale with the power of AI.
					</p>
				</div>
			</section>

			{/* Mission & Vision */}
			<section className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-6xl mx-auto">
					<div className="grid md:grid-cols-2 gap-12">
						<div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 relative">
							<h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
								<span className="w-2 h-8 bg-blue-500 rounded-full"></span>
								Our Mission
							</h2>
							<p className="text-gray-300 leading-relaxed mb-4">
								To democratize professional content creation by making advanced
								AI tools accessible to everyone, regardless of their budget or
								expertise level.
							</p>
							<p className="text-gray-300 leading-relaxed">
								We believe every creator deserves powerful tools to express
								their ideas and build their brand without spending hours on
								content creation.
							</p>
						</div>

						<div className="bg-linear-to-br from-purple-900/30 to-pink-900/30 backdrop-blur border border-purple-500/20 rounded-2xl p-8 relative">
							<h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
								<span className="w-2 h-8 bg-linear-to-b from-purple-500 to-pink-500 rounded-full"></span>
								Our Vision
							</h2>
							<p className="dark:text-gray-300 text-gray-100 leading-relaxed mb-4">
								A world where AI is a creative partner that amplifies human
								potential, not replaces it.
							</p>
							<p className="dark:text-gray-300 leading-relaxed text-gray-100 mb-4">
								We envision a future where creators can focus on strategy and
								authenticity while AI handles the heavy lifting of production
								and optimization.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Core Values */}
			<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-800/20">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
						Our Core Values
					</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{values.map((value, index) => (
							<div
								key={index}
								className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl p-6 hover:border-purple-400 dark:hover:border-purple-500/50 transition-colors"
							>
								<div className="mb-4">{value.icon}</div>
								<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
									{value.title}
								</h3>
								<p className="text-gray-600 dark:text-gray-400 text-sm">
									{value.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Team */}
			<section className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
						Our Team
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						{team.map((member, index) => (
							<div
								key={index}
								className="bg-linear-to-br from-gray-100 to-gray-50 dark:from-slate-800 dark:to-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl p-8 text-center hover:border-blue-400 dark:hover:border-blue-500/50 transition-colors"
							>
								<div className="text-5xl mb-4">{member.icon}</div>
								<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
									{member.name}
								</h3>
								<p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">
									{member.role}
								</p>
								<p className="text-gray-600 dark:text-gray-400">
									{member.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Milestones */}
			<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-800/20">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
						Our Journey
					</h2>
					<div className="grid md:grid-cols-4 gap-4">
						{milestones.map((milestone, index) => (
							<div
								key={index}
								className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-lg p-6 text-center"
							>
								<div className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
									{milestone.year}
								</div>
								<p className="text-gray-700 dark:text-gray-300 font-semibold">
									{milestone.achievement}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Why Choose Us */}
			<section className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
						Why Choose Us?
					</h2>
					<div className="space-y-4">
						{[
							"Advanced AI technology trained on millions of high-quality content pieces",
							"Customizable templates for every content type and industry",
							"Real-time analytics and performance insights",
							"Affordable pricing plans for solopreneurs to enterprises",
							"Dedicated support team ready to help you succeed",
							"Regular updates with new features and capabilities",
						].map((reason, index) => (
							<div
								key={index}
								className="flex items-start gap-4 bg-gray-100 dark:bg-slate-800/30 p-4 rounded-lg border border-gray-200 dark:border-slate-700/50"
							>
								<ArrowRight className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
								<p className="text-gray-700 dark:text-gray-300">{reason}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border-y border-gray-200 dark:border-slate-700">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
						Ready to Transform Your Content Creation?
					</h2>
					<p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
						Join thousands of creators using AI Content Generator to produce
						professional content at scale.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							href="/dashboard/generate"
							className="px-8 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
						>
							Start Creating
						</Link>
						<Link
							href="/contact"
							className="px-8 py-3 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-gray-300 rounded-lg font-semibold hover:border-gray-400 dark:hover:border-slate-400 transition-colors"
						>
							Contact Us
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
