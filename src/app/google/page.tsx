export default async function Page() {
	return (
		<>
			<h1>Sign in</h1>
			<a href="/google/login" className="block">Sign in with Google</a>
			<a href="/google/add-calendar">Google Calendar</a>
		</>
	)
}
