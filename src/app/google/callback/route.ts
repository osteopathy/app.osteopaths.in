import { google, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import e from "@/lib/edgeql-js"
import { client } from "@/lib/db";
import { v4 as generateUUID } from 'uuid';

type GoogleUserResult = {
	id: string;
	email: string;
	verified_email: boolean;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	locale: string;
};

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);

	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	const storedState = cookies().get('google_oauth_state')?.value ?? null;
	const codeVerifier = cookies().get('google_oauth_code')!.value ?? null;

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await google.validateAuthorizationCode(code, codeVerifier);
		const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`,
			},
		});
		// const googleUserInfoResponse = await fetch(
		// 	`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.accessToken}`,
		// 	{
		// 		headers: {
		// 			Authorization: `Bearer ${tokens.idToken}`
		// 		}
		// 	}
		// )

		const googleUser: GoogleUserResult = await response.json();

		if (!googleUser?.email) {
			return new Response(null, {
				status: 302,
				headers: {
					Location: '/google'
				}
			});
		}

		// Replace this with your own DB client.
		let existingUser = googleUser.email
			? await e.select(e.User, (_) => ({
				id: true,
				filter_single: { email: googleUser.email },
			})).run(client)
			: false;

		if (existingUser) {

			const session = await lucia.createSession(existingUser.id, {}, { sessionId: generateUUID() });
			const sessionCookie = lucia.createSessionCookie(session.id);

			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/"
				}
			});
		}

		const user = await e.insert(e.User, {
			email: googleUser.email,
			name: googleUser.name,
			picture: googleUser.picture,
			role: e.Role.User
		}).run(client);

		const session = await lucia.createSession(user.id, {}, { sessionId: generateUUID() });
		const sessionCookie = lucia.createSessionCookie(session.id);

		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/"
			}
		})
	} catch (e) {
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}