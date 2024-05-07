import { Lucia } from "lucia";
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
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
		};
	}
});

import { Google } from "arctic";

// export const google = new Google(process.env.GITHUB_CLIENT_ID!, process.env.GITHUB_CLIENT_SECRET!);

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
}