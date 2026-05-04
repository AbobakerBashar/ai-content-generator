import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE(_, { params }) {
	const { id } = await params;
	try {
		const supabase = await createClient();
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}
		const user_id = user.id;

		const { error } = await supabase
			.from("generations")
			.delete()
			.eq("id", id)
			.eq("user_id", user_id);
		if (error) throw error;
		revalidatePath("/dashboard");
		revalidatePath("/dashboard/history");
		return NextResponse.json({ message: "Generation deleted successfully" });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
