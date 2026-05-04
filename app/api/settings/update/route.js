import { getCurrentUser } from "@/actions/users";
import { createClient } from "@/utils/supabase/server";

export async function PUT(request) {
	try {
		const body = await request.json();
		const { updates, isPublic } = body;
		if (isPublic !== undefined) {
			return new Response(
				JSON.stringify({
					isPublic,
					message: "Public profile setting updated successfully!",
				}),
				{
					status: 200,
					headers: { "Content-Type": "application/json" },
				},
			);
		}
		const user = await getCurrentUser();
		if (!user) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			});
		}

		const supabase = await createClient();
		if (updates?.email) {
			// const supabase = createClientWithoutAuth();
			const { error: emailError } = await supabase.auth.updateUser({
				email: updates.email,
			});

			if (emailError) {
				return new Response(JSON.stringify({ error: emailError.message }), {
					status: 500,
					headers: { "Content-Type": "application/json" },
				});
			}

			return new Response(
				JSON.stringify({
					email: updates.email,
					message:
						"Email updated successfully! Please check your inbox to confirm the change.",
				}),
				{
					status: 200,
					headers: { "Content-Type": "application/json" },
				},
			);
		} else {
			const { data: existingSettings, error: fetchError } = await supabase
				.from("settings")
				.select("*")
				.eq("user_id", user.id)
				.maybeSingle();
			if (fetchError) {
				return new Response(JSON.stringify({ error: fetchError.message }), {
					status: 500,
					headers: { "Content-Type": "application/json" },
				});
			}

			if (!existingSettings) {
				const { error: insertError } = await supabase
					.from("settings")
					.insert({ user_id: user.id, ...updates });
				if (insertError) {
					return new Response(JSON.stringify({ error: insertError.message }), {
						status: 500,
						headers: { "Content-Type": "application/json" },
					});
				}
			} else {
				const { error } = await supabase
					.from("settings")
					.update(updates)
					.eq("user_id", user.id);

				if (error) {
					return new Response(JSON.stringify({ error: error.message }), {
						status: 500,
						headers: { "Content-Type": "application/json" },
					});
				}
			}

			return new Response(
				JSON.stringify({
					...updates,
					message: "Settings updated successfully!",
				}),
				{
					status: 200,
					headers: { "Content-Type": "application/json" },
				},
			);
		}
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
