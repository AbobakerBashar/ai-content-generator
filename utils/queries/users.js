import { createClient } from "../supabase/browser";

export const getUser = async () => {
	const supabase = createClient();
	const { data, error } = await supabase.auth.getUser();

	if (error) {
		throw new Error(error.message);
	}
	console.log("Supabase getUser response:", data);
	const { data: user, error: profileError } = supabase
		.from("users")
		.select("*")
		.eq("id", data.user.id)
		.single();
	console.log("Supabase getUser profile response:", user, profileError);
	if (profileError) {
		throw new Error(profileError.message);
	}
	return user;
};
