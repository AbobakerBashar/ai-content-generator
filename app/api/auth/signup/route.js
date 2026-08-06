import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		const body = await request.json();
		const { email, password, name } = body;
		const supabase = await createClient();

		if (!email || !password || !name) {
			return NextResponse.json(
				{ error: "Email, password, and name are required" },
				{ status: 400 },
			);
		}

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					name,
				},
			},
		});
		if (error)
			return NextResponse.json({ error: error.message }, { status: 400 });

		const user = data.user;
		return NextResponse.json(
			{
				success: true,
				user,
				message: "Account created successfully.",
			},
			{ status: 201 },
		);
	} catch (error) {
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
