import { getExamples } from "@/actions/examples";
import {
	ArrowRight,
	BarChart3,
	FileText,
	Mail,
	Megaphone,
	MessageCircle,
	PenTool,
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
const fetchExamples = async () => {
	try {
		const examples = await getExamples();
		return examples.map((example) => ({
			id: example.id,
			type: example.type,
			title: example.title,
		}));
	} catch (error) {
		throw new Error("Failed to load example");
	}
};
const RelatedExamples = async ({ exampleId }) => {
	const examples = await fetchExamples();

	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
				Explore Other Examples
			</h2>

			<div className="grid md:grid-cols-2 gap-6">
				{examples.map((ex) => {
					if (ex.id === exampleId) return null;
					const Icon = icons[ex.type] || FileText;
					return (
						<Link
							key={ex.id}
							href={`/examples/${ex.id}`}
							className="group bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:border-primary/50 transition-all duration-300"
						>
							<div className="flex items-start justify-between mb-4">
								<div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
									<Icon className="w-6 h-6 text-primary" />
								</div>
								<ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
							</div>
							<h3 className="text-xl font-bold text-foreground mb-2">
								{ex.type}
							</h3>
							<p className="text-muted-foreground line-clamp-2">{ex.title}</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default RelatedExamples;
