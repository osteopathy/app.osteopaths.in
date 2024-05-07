import { google, lucia } from "@/lib/server/lucia";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import e from "@/lib/edgeql-js"

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

const getUserByEmail = async (email: string) => {
      const users = e.select(e.User, () => ({
    id: true,
    email: true,
  }))
  const user = await users.run(client);
}

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
            ? await db.query.userTable.findFirst({
                where: eq(userTable.email, payload.email),
                columns: {
                    id: true
                }
            })
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
		await db.table("user").insert({
			id: userId,
			github_id: githubUser.id,
			username: githubUser.login
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/"
			}
		});
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

interface GitHubUser {
	id: string;
	login: string;
}