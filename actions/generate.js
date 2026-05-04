import { createClient } from "@/utils/supabase/server";
import { getUser } from "./users";

// Fetching stats in a Server Component
export async function getUserStats(user_id) {
	const supabase = await createClient();

	// Fetch total count and counts by status in parallel
	const [total, success, failed] = await Promise.all([
		supabase
			.from("generations")
			.select("*", { count: "exact", head: true })
			.eq("user_id", user_id),
		supabase
			.from("generations")
			.select("*", { count: "exact", head: true })
			.eq("user_id", user_id)
			.eq("status", "SUCCESS"),
		supabase
			.from("generations")
			.select("*", { count: "exact", head: true })
			.eq("user_id", user_id)
			.eq("status", "FAILED"),
	]);

	return {
		total: total.count || 0,
		success: success.count || 0,
		failed: failed.count || 0,
	};
}

// Get recent generations for a user
export async function getRecentGenerations(limit = 5) {
	const user = await getUser();

	if (!user) {
		throw new Error("Unauthorized");
	}

	const supabase = await createClient();

	const { data, error } = await supabase
		.from("generations")
		.select(
			"id, prompt, content, created_at, rating,content_type, created_at, tokens_used",
		)
		.eq("user_id", user.id)
		.order("created_at", { ascending: false })
		.limit(limit);

	if (error) {
		throw new Error(error.message);
	}

	return data;
}

// Get All generations for a user
export async function getAllGenerations(limit = 100) {
	const user = await getUser();
	if (!user) {
		throw new Error("Unauthorized");
	}
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("generations")
		.select("id, prompt, content, created_at, rating")
		.eq("user_id", user.id)
		.limit(limit);
	if (error) {
		throw new Error(error.message);
	}
	return data;
}
