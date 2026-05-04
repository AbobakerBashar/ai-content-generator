import { createClient } from "@/utils/supabase/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
	try {
		const { prompt, content_type } = await req.json();

		// 1. Define a mapping for your content types
		const systemPrompts = {
			blog: "You are an expert SEO blog writer. Use engaging headings, clear paragraphs, and an informative tone.",
			social_media:
				"You are a social media strategist. Write punchy, viral-style content with emojis and relevant hashtags.",
			email:
				"You are a professional communicator. Write clear, concise emails with a compelling subject line and a clear call to action.",
			default: "You are a helpful AI assistant.",
		};

		// 2. Select the correct role based on the content_type passed from the frontend
		const selectedRole = systemPrompts[content_type] || systemPrompts.default;

		const supabase = await createClient();
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();

		if (authError || !user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// SECURE BALANCE
		const { data: userData, error: userError } = await supabase
			.from("users")
			.select("credits")
			.eq("id", user.id)
			.single();

		if (userError || !userData) {
			return NextResponse.json(
				{ error: "Could not fetch user profile" },
				{ status: 500 },
			);
		}

		if (userData.credits <= 0) {
			return NextResponse.json(
				{ error: "Insufficient credits. Please upgrade your plan." },
				{ status: 402 },
			);
		}

		// Create the pending generation record
		const { data: generation, error: insertError } = await supabase
			.from("generations")
			.insert({
				user_id: user.id,
				prompt,
				system_role: "You are a helpful AI assistant.",
				parameters: { model: "gemini-1.5-flash" },
				content_type,
				model_used: "gemini-1.5-flash",
				status: "PENDING",
			})
			.select()
			.single();

		if (insertError) throw insertError;

		// Generate Content
		// Initialize the model WITH the system instruction
		// const model = genAI.getGenerativeModel({
		// 	model: "gemini-3-flash",
		// 	systemInstruction: selectedRole,
		// });
		// // const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
		// const result = await model.generateContent(prompt);
		const model = genAI.getGenerativeModel({
			model: "gemini-flash-latest",
			systemInstruction: selectedRole,
		});
		// 2. Generate Content
		// Note: If you want to be safe, wrap the prompt to ensure the AI knows the type
		const finalPrompt = `Content Type: ${content_type}\n\nUser Request: ${prompt}`;

		const result = await model.generateContent(finalPrompt);

		const responseText = result.response.text();
		const tokensUsed = result.response.usageMetadata?.totalTokenCount ?? 0;

		// Calculate new balance
		const newCredits =
			userData.credits - tokensUsed >= 0 ? userData.credits - tokensUsed : 0;

		//  Update both tables concurrently
		const [{ error: creditError }, { error: updateError }] = await Promise.all([
			supabase.from("users").update({ credits: newCredits }).eq("id", user.id),
			supabase
				.from("generations")
				.update({
					content: responseText,
					status: "SUCCESS",
					tokens_used: tokensUsed,
				})
				.eq("id", generation.id),
		]);

		if (updateError || creditError) {
			console.error("Database update failed:", updateError || creditError);
			throw new Error("Failed to finalize generation records.");
		}

		// revalidatePath("/dashboard/crredits");

		return NextResponse.json({
			text: responseText,
			remainingCredits: newCredits,
		});
	} catch (error) {
		console.error("Generation Error:", error);
		return NextResponse.json(
			{ error: "Something went wrong during generation." },
			{ status: 500 },
		);
	}
}
