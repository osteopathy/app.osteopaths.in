import { google, lucia } from '@/lib/auth'
import { cookies } from 'next/headers'
import { OAuth2RequestError } from 'arctic'
import e from '@/lib/edgeql-js'
import { client } from '@/lib/db'
import { v4 as generateUUID } from 'uuid'
import calendarService, { CalendarName } from '@/lib/calendar'

type GoogleUserResult = {
	id: string
	email: string
	verified_email: boolean
	name: string
	given_name: string
	family_name: string
	picture: string
	locale: string
}

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url)
	const code = url.searchParams.get('code')
	const state = url.searchParams.get('state')
	const scope = url.searchParams.get('scope')

	const isAddCalendarCallback = scope?.includes('calendar')

	const storedState = cookies().get('google_oauth_state')?.value ?? null
	const codeVerifier = cookies().get('google_oauth_code')!.value ?? null

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400,
		})
	}

	try {
		const tokens = await google.validateAuthorizationCode(code, codeVerifier)
		console.log(tokens)
		const response = await fetch(
			`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.accessToken}`,
			{
				headers: {
					Authorization: `Bearer ${tokens.idToken}`,
				},
			}
		)
		// const response = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
		// 	headers: {
		// 		Authorization: `Bearer ${tokens.accessToken}`,
		// 	},
		// })
		console.log(await response.json())
		// const calc = calendarService({
		// 	access_token: tokens.accessToken,
		// 	refresh_token: tokens.refreshToken,
		// 	calendarId: '',
		// })

		const googleUser: GoogleUserResult = await response.json()
		console.log(googleUser)
		if (!googleUser?.email) {
			return new Response(null, {
				status: 302,
				headers: {
					Location: '/google',
				},
			})
		}

		// Replace this with your own DB client.
		console.log('IS EXISTING USER:', googleUser.email)
		let existingUser = googleUser.email
			? await e
					.select(e.User, (_) => ({
						id: true,
						filter_single: { email: googleUser.email },
					}))
					.run(client)
			: false

		if (existingUser) {
			console.log('EXISTING USER', existingUser.id)
			const session = await lucia.createSession(existingUser.id, {}, { sessionId: generateUUID() })
			const sessionCookie = lucia.createSessionCookie(session.id)

			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
			return new Response(null, {
				status: 302,
				headers: {
					Location: '/',
				},
			})
		}
		console.log('CREATING NEW USER:')
		const user = await e
			.insert(e.User, {
				email: googleUser.email,
				name: googleUser.name,
				picture: googleUser.picture,
				role: e.Role.user,
			})
			.run(client)

		const session = await lucia.createSession(user.id, {}, { sessionId: generateUUID() })
		const sessionCookie = lucia.createSessionCookie(session.id)

		// Not working for some reson

		// /**
		//  * Perform Two Searches
		//  * 1. In db
		//  * 2. In User calendar
		//  */

		// let calendarTypeData = {
		// 	calendarId: '',
		// 	gmail: googleUser.email,
		// 	accessToken: tokens.accessToken,
		// 	accessTokenExpiresAt: tokens.accessTokenExpiresAt,
		// 	idToken: tokens.idToken,
		// 	refreshToken: tokens.refreshToken!,
		// }

		// if (isAddCalendarCallback) {
		// 	console.log('ADD CALENDAR CALLBACK!!!!')
		// 	const dbCalendar = await e
		// 		.select(e.Calendar, () => ({
		// 			filter_single: { gmail: googleUser.email },
		// 		}))
		// 		.run(client)

		// 	const listCalendars = await calc.listCalendars()

		// 	const userCalendar = listCalendars.find((calendar) => {
		// 		calendar.name === CalendarName
		// 	})

		// 	console.log(listCalendars, userCalendar)

		// 	const res = await calc.addCalendar()

		// 	if (!userCalendar) {
		// 		// If User Calendar is not present but dbCalendar is Present
		// 		calendarTypeData = {
		// 			...calendarTypeData,
		// 			calendarId: res.id!, // Might be dangerous
		// 		}
		// 		await e
		// 			.update(e.Calendar, () => ({
		// 				filter_single: { gmail: googleUser.email },
		// 				set: calendarTypeData,
		// 			}))
		// 			.run(client)
		// 	} else if (!dbCalendar) {
		// 		// If DB Calendar is present but user Calendar is not present
		// 		await e
		// 			.insert(e.Calendar, {
		// 				...calendarTypeData,
		// 				calendarId: userCalendar.externalId,
		// 			})
		// 			.run(client)
		// 	} else {
		// 		// If both are not present
		// 		await e
		// 			.insert(e.Calendar, {
		// 				calendarId: res.id!, // Might be dangerous
		// 				gmail: googleUser.email,
		// 				accessToken: tokens.accessToken,
		// 				accessTokenExpiresAt: tokens.accessTokenExpiresAt,
		// 				idToken: tokens.idToken,
		// 				refreshToken: tokens.refreshToken!,
		// 			})
		// 			.run(client)
		// 	}
		// }

		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/',
			},
		})
	} catch (e) {
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400,
			})
		}
		console.log(e)
		// TODO: handle error related to calendar
		return new Response(null, {
			status: 500,
		})
	}
}
