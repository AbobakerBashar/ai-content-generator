import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req) {
	const { name, email, message, subject, is_guest, user_id } = await req.json();
	console.log("Received contact message:", {
		name,
		email,
		subject,
		message,
		is_guest,
		user_id,
	});
	try {
		const supabase = await createClient(false);
		const { data, error } = await supabase.from("contact_messages").insert({
			name,
			email,
			subject,
			message,
			is_guest,
			user_id,
		});
		if (error) {
			console.error("Error inserting contact message:", error);
			return NextResponse.json(
				{ success: false, error: "Failed to save message" },
				{ status: 500 },
			);
		}
		return NextResponse.json(
			{ success: true, message: "Message received successfully" },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				error: error.message,
			},
			{ status: 500 },
		);
	}
}
