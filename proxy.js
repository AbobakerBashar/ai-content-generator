import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function proxy(request) {
	// 1. Create an unmodified response
	let supabaseResponse = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});

	// 2. Initialize the Supabase client specifically for the middleware
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) =>
						request.cookies.set(name, value),
					);
					supabaseResponse = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (request.nextUrl.pathname.startsWith("/dashboard") && !user) {
		const redirectUrl = request.nextUrl.clone();
		redirectUrl.pathname = "/auth/sign-in";

		redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);
		console.log("Redirecting to:", request.nextUrl.pathname.toString());

		return NextResponse.redirect(redirectUrl);
	}

	return supabaseResponse;
}

// 6. Define which paths the middleware should run on
export const config = {
	matcher: [
		"/dashboard/:path*",
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
