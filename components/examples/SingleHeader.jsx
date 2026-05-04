import {
	BarChart3,
	Check,
	FileText,
	Mail,
	Megaphone,
	MessageCircle,
	PenTool,
	X,
} from "lucide-react";
import Link from "next/link";

const icons = {
	"Blog Post": FileText,
	"Social Media": MessageCircle,
	"Email Markting": Mail,
	"Ad Copy": Megaphone,
	"Sales Pages": BarChart3,
	"Creative Content": PenTool,
};

const SingleHeader = async ({ example }) => {
	const Icon = icons[example.type] || FileText;

	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<Link
				href="/examples"
				className="text-primary hover:text-primary/80 font-semibold transition-colors flex items-center gap-2 mb-8"
			>
				← Back to Examples
			</Link>

			<div className="flex items-start gap-4 mb-8">
				<div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
					<Icon className="w-8 h-8 text-primary" />
				</div>
				<div>
					<p className="text-primary font-semibold text-sm mb-2">
						{example.type}
					</p>
					<h1 className="text-4xl md:text-5xl font-bold text-foreground">
						{example.title}
					</h1>
				</div>
			</div>

			{/* Metadata */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
				{Object.entries(example.metadata).map(([key, value]) => (
					<div
						key={key}
						className="bg-card p-4 rounded-xl border border-border"
					>
						<p className="text-xs text-muted-foreground uppercase font-semibold mb-1">
							{key
								.replace(/([A-Z])/g, " $1")
								.trim()
								.replace(/_/g, " ")}
						</p>
						<p className="text-lg font-bold text-foreground">
							{typeof value === "boolean" ? (
								value ? (
									<Check className="w-4 h-4" />
								) : (
									<X className="w-4 h-4" />
								)
							) : (
								value
							)}
						</p>
					</div>
				))}
			</div>

			{/* Stats */}
			{example.stats && (
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
					{example.stats?.map((stat, index) => (
						<div key={index} className="text-center">
							<p className="text-3xl md:text-4xl font-bold text-primary mb-1">
								{stat.value}
							</p>
							<p className="text-sm text-muted-foreground">{stat.label}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SingleHeader;
