import { generateCodeVerifier, generateState } from 'arctic'
import { google } from '@/lib/auth'
import { cookies } from 'next/headers'
import { env } from '@/env'

export async function GET(request: Request): Promise<Response> {
	const state = generateState()
	const code = generateCodeVerifier()

	const hasCalendarParam = new URL(request.url).searchParams.get('calendar') === 'true'

	const url = await google.createAuthorizationURL(state, code, {
		scopes: [...env.GOOGLE_SCOPES, ...(hasCalendarParam ? env.GOOGLE_CALENDAR_SCOPES : [])],
	})

	// extra configrations for google
	url.searchParams.set('access_type', 'offline')
	url.searchParams.set('prompt', 'consent')

	cookies().set('google_oauth_state', state, {
		path: '/',
		secure: process.env.NODE_ENV === 'production',
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax',
	})

	cookies().set('google_oauth_code', code, {
		path: '/',
		secure: process.env.NODE_ENV === 'production',
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax',
	})

	return Response.redirect(url)
}
