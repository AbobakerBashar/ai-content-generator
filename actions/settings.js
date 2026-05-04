import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "./users";

export async function getSettings() {
	const user = await getCurrentUser();
	if (!user) {
		throw new Error("User not authenticated");
	}

	const supabase = await createClient();
	const { data, error } = await supabase
		.from("settings")
		.select("*, user:users(id, email)")
		.eq("user_id", user.id)
		.maybeSingle();

	if (error) {
		return error;
	}
	return data
		? data
		: {
				user: { email: user.email, id: user.id },
				theme: "system",
				email_about_credits_usage: true,
				notify_on_new_features: true,
				language: "English",
			};
}
