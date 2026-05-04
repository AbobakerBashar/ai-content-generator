import { getSession, getUser } from "@/actions/users";
import { createClient } from "@/utils/supabase/server";

// Get user profile
export async function GET(request) {
	// const { searchParams } = new URL(request.url);
	// const all = searchParams.get("all");

	try {
		const user = await getUser();
		if (!user) {
			return Response.json({ error: "User not found" }, { status: 404 });
		}
		return Response.json(user, { status: 200 });
	} catch (error) {
		return Response.json(
			{ error: error.message || "Failed to fetch user" },
			{ status: 500 },
		);
	}
}

export async function PUT(request) {
	try {
		const body = await request.json();
		const { updates } = body;

		const session = await getSession();
		if (!session) {
			return Response.json({ error: "Unauthorized" }, { status: 401 });
		}
		const supabase = await createClient();

		const { data: user, error: userError } = await supabase
			.from("users")
			.update(updates)
			.eq("id", session.user.id);
		if (userError) {
			return Response.json(
				{ error: userError.message || "Failed to update user" },
				{ status: 400 },
			);
		}

		return Response.json(
			{
				message: "Profile updated successfully",
				user,
			},
			{ status: 200 },
		);
	} catch (error) {
		return Response.json(
			{ error: error.message || "Failed to update profile" },
			{ status: 500 },
		);
	}
}
