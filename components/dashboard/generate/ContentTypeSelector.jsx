import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const contentTypes = [
	{ value: "blog", label: "Blog Post" },
	{ value: "social_media", label: "Social Media" },
	{ value: "email", label: "Email" },
	{ value: "ad", label: "Ad Copy" },
	{ value: "product", label: "Product Description" },
];

const ContentTypeSelector = ({ contentType, setContentType }) => {
	return (
		<div className="mb-6">
			<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
				Content Type
			</label>
			<Select
				value={contentType || contentTypes[0].value}
				onValueChange={setContentType}
			>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Select content type" />
				</SelectTrigger>
				<SelectContent>
					{contentTypes.map((type) => (
						<SelectItem key={type.value} value={type.value}>
							{type.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

export default ContentTypeSelector;
