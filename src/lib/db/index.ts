import { createClient } from 'edgedb'
const baseClient = createClient()

export const client = baseClient.withConfig({
	allow_user_specified_id: true,
})
