import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");
	// Use "next" parameter if available, otherwise default to dashboard
	const next = requestUrl.searchParams.get("redirectTo") ?? "/dashboard";

	// Intercept Supabase Auth errors passed in the URL
	const errorParam = requestUrl.searchParams.get("error");
	const errorDescription = requestUrl.searchParams.get("error_description");

	if (errorParam || errorDescription) {
		console.error("Supabase Auth Error:", errorDescription || errorParam);
		return NextResponse.redirect(
			`${requestUrl.origin}/auth/sign-in?error=${encodeURIComponent(errorDescription || errorParam)}`,
		);
	}

	if (code) {
		const supabase = await createClient();

		// Exchange the authorization code for a user session
		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			return NextResponse.redirect(`${requestUrl.origin}${next}`);
		} else {
			console.error("Auth callback error:", error.message);
		}
	}

	// If there's an error or no code, redirect to the sign-in page
	return NextResponse.redirect(
		`${requestUrl.origin}/auth/sign-in?error=auth_callback_failed`,
	);
}
