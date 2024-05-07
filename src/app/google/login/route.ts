import { generateCodeVerifier, generateState } from "arctic";
import { google } from "@/lib/server/lucia/index";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
	const state = generateState();
	const code = generateCodeVerifier();
	const url = await google.createAuthorizationURL(state, code, {
		scopes: [...process.env.GOOGLE_SCOPES!.split(',')]
	});

    // extra configrations for google
	url.searchParams.set('access_type', 'offline');
	url.searchParams.set('prompt', 'consent');

    cookies().set('google_oauth_state', state, {
		path: '/',
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});

	cookies().set('google_oauth_code', code, {
		path: '/',
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});

	return Response.redirect(url);
}