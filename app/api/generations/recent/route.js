import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req) {
	const { searchParams } = new URL("api/generations", req.url);
	const limit = Number(searchParams.get("limit")) || 5;
	try {
		const supabase = await createClient();
		const {
			data: { user },
		} = await supabase.auth.getUser();
		console.log("User in API Route:", user);
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}
		const user_id = user.id;
		const { data, error } = await supabase
			.from("generations")
			.select("id, prompt, content, created_at, rating")
			.eq("user_id", user_id)
			.order("created_at", { ascending: false })
			.limit(limit);

		if (error) throw error;

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
