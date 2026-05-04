import { createClient } from "@/utils/supabase/server";

export const getExamples = async () => {
	const supabase = await createClient(false);
	const { data: examples, error } = await supabase
		.from("examples")
		.select("id, title, type, description, samples")
		.order("created_at", { ascending: true });

	if (error) {
		console.error("Error fetching examples:", error);
		throw new Error("Failed to load examples");
	}
	return examples;
};

export const getExampleById = async (id) => {
	const supabase = await createClient(false);
	const { data: example, error } = await supabase
		.from("examples")
		.select(
			"id, title, type, description, samples, metadata, content, testimonial, rating",
		)
		.eq("id", id)
		.maybeSingle();
	if (error) {
		throw new Error("Failed to load example");
	}
	return example;
};
