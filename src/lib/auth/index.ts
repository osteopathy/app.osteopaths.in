import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Lucia, type User, type Session } from "lucia";
import { EdgeDBjAdapter } from "./edgedb-adapter"
import e, { createClient } from "@/lib/edgeql-js";

const client = createClient();

const adapter = new EdgeDBjAdapter(e,client);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production"
		}
	},
	getSessionAttributes: (attributes) => {
		return {
			...attributes
		}
	},
	getUserAttributes: (attributes) => {
		return {
			...attributes
		};
	}
});

export async function logout(): Promise<{error: string | null;}> {
	"use server";
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized"
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/login");
}

/**
 * This function can then be used in server components and form actions to get the current session and user.
 */
export const validateRequest = cache(
	async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null
			};
		}

		const result = await lucia.validateSession(sessionId);
		// next.js throws when you attempt to set cookie when rendering page
		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
		} catch {}
		return result;
	}
);

import { Google } from "arctic";

export const google = new Google(process.env.GITHUB_CLIENT_ID!, process.env.GITHUB_CLIENT_SECRET!, process.env.NODE_ENV === "production" ? process.env.GITHUB_REDIRECT_URI! : 'http://localhost:3000');

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
}