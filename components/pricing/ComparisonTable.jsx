import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";

const ComparisonTable = () => {
	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
			<Card>
				<CardHeader>
					<CardTitle className="text-4xl font-bold text-center mb-16">
						Feature Comparison
					</CardTitle>
				</CardHeader>

				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="text-left p-4 font-semibold text-foreground">
									Feature
								</TableHead>
								<TableHead className="text-center p-4 font-semibold text-foreground">
									Starter
								</TableHead>
								<TableHead className="text-center p-4 font-semibold text-primary">
									Pro
								</TableHead>
								<TableHead className="text-center p-4 font-semibold text-foreground">
									Enterprise
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell className="p-4 text-foreground">
									Monthly Words
								</TableCell>
								<TableCell className="text-center p-4">10,000</TableCell>
								<TableCell className="text-center p-4 text-primary font-semibold">
									100,000
								</TableCell>
								<TableCell className="text-center p-4">Unlimited</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="p-4 text-foreground">
									Content Types
								</TableCell>
								<TableCell className="text-center p-4">5</TableCell>
								<TableCell className="text-center p-4 text-primary font-semibold">
									Unlimited
								</TableCell>
								<TableCell className="text-center p-4">Unlimited</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="p-4 text-foreground">AI Models</TableCell>
								<TableCell className="text-center p-4">GPT-4</TableCell>
								<TableCell className="text-center p-4 text-primary font-semibold">
									GPT-4 + Custom
								</TableCell>
								<TableCell className="text-center p-4">
									GPT-4 + Custom + Enterprise
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="p-4 text-foreground">Templates</TableCell>
								<TableCell className="text-center p-4">Basic</TableCell>
								<TableCell className="text-center p-4 text-primary font-semibold">
									Premium
								</TableCell>
								<TableCell className="text-center p-4">All + Custom</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="p-4 text-foreground">Support</TableCell>
								<TableCell className="text-center p-4">Email</TableCell>
								<TableCell className="text-center p-4 text-primary font-semibold">
									Priority
								</TableCell>
								<TableCell className="text-center p-4">
									24/7 Dedicated
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="p-4 text-foreground">
									API Access
								</TableCell>
								<TableCell className="text-center p-4">
									<X className="w-4 h-4 inline" />
								</TableCell>
								<TableCell className="text-center p-4 text-primary font-semibold">
									<Check className="w-4 h-4 inline" />
								</TableCell>
								<TableCell className="text-center p-4">
									<Check className="w-4 h-4 inline" /> + Custom
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="p-4 text-foreground">
									Brand Voice
								</TableCell>
								<TableCell className="text-center p-4">
									<Check className="w-4 h-4 inline" />
								</TableCell>
								<TableCell className="text-center p-4 text-primary font-semibold">
									<Check className="w-4 h-4 inline" />
								</TableCell>
								<TableCell className="text-center p-4">
									<Check className="w-4 h-4 inline" /> + Advanced
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</section>
	);
};

export default ComparisonTable;
