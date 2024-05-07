import { google, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import e from "@/lib/edgeql-js"
import { client } from "@/lib/db";

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
        
        const googleUserInfoResponse = await fetch(
			`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.accessToken}`,
			{
				headers: {
					Authorization: `Bearer ${tokens.idToken}`
				}
			}
		)
        
        const googleUser: GoogleUserResult = await googleUserInfoResponse.json();
        
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
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/"
				}
			});
		}

		const userId = generateIdFromEntropySize(10); // 16 characters long

		// Replace this with your own DB client.
		await e.insert(e.User, {
			email: googleUser.email,
			name: googleUser.name,
			picture: googleUser.name,
			role: e.Role.User
		}).run(client);

		const session = await lucia.createSession(userId, {});
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