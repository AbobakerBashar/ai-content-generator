import { createClient, createClientWithoutAuth } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function DELETE() {
	try {
		const supabase = await createClient();
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser();
		if (userError) {
			return new Response(
				JSON.stringify({ error: userError.message || "Failed to get user" }),
				{
					status: 400,
				},
			);
		}
		if (!user) {
			return new Response(JSON.stringify({ error: "User not authenticated" }), {
				status: 401,
			});
		}

		// Delete the user account using Supabase Admin API
		const userId = user.id;

		const supabaseAdmin = createClientWithoutAuth();

		const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
		if (error) {
			return new Response(
				JSON.stringify({ error: error.message || "Failed to delete account" }),
				{
					status: 400,
				},
			);
		}

		revalidatePath("/dashboard");

		return new Response(
			JSON.stringify({ message: "Account deleted successfully" }),
			{
				status: 200,
			},
		);
	} catch (error) {
		return new Response(
			JSON.stringify({ error: error.message || "Failed to delete account" }),
			{
				status: 500,
			},
		);
	}
}
