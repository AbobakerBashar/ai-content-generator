import { createClient } from "@/utils/supabase/server";

export const getFAQs = async (relatedTo, limit = 6) => {
	const supabase = await createClient();
	let query = supabase
		.from("faqs")
		.select("question, answer, related_to")
		.order("created_at", { ascending: false })
		.limit(limit);
	if (relatedTo) {
		query = query.ilike("related_to", `%${relatedTo}%`);
	}
	const { data, error } = await query;
	if (error) {
		throw new error();
	}
	return data;
};
