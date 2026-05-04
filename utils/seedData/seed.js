import { createClient } from "@/utils/supabase/server";
import examplesData from "./examples.json";

export async function seedExamples() {
	try {
		const supabase = await createClient();

		// Delete existing examples to avoid duplicates (optional)
		// const { error: deleteError } = await supabase.from("examples").delete().neq("id", "null");
		// if (deleteError) console.error("Error deleting existing examples:", deleteError);

		// Insert new examples
		const { data, error } = await supabase
			.from("examples")
			.insert(examplesData)
			.select();

		if (error) {
			console.error("Error seeding examples:", error);
			throw new Error(`Failed to seed examples: ${error.message}`);
		}

		console.log(`✅ Successfully seeded ${data.length} examples`);
		return data;
	} catch (error) {
		console.error("Seeding failed:", error);
		throw error;
	}
}

// Run this in your app initialization or as a one-time migration
// Example usage in a route handler:
// export async function POST(req) {
//   try {
//     const result = await seedExamples();
//     return Response.json({ success: true, count: result.length });
//   } catch (error) {
//     return Response.json({ success: false, error: error.message }, { status: 500 });
//   }
// }
