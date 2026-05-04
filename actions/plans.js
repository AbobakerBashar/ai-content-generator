import { createClient } from "@/utils/supabase/server";

export const getPlans = async () => {
	const supabase = await createClient();
	const { data: plans, error } = await supabase
		.from("plans")
		.select("free, pro, enterprise")
		.order("created_at", { ascending: true })
		.maybeSingle();
	if (error) throw error;
	return plans;
};
