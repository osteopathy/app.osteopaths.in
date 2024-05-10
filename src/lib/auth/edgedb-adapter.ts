import type { Client } from 'edgedb'
import ea from '@/lib/edgeql-js'
import type {
	Adapter,
	DatabaseSession,
	RegisteredDatabaseSessionAttributes,
	DatabaseUser,
	RegisteredDatabaseUserAttributes,
	UserId,
} from 'lucia'

export class EdgeDBjAdapter implements Adapter {
	e: typeof ea
	client: Client

	constructor(_e: typeof ea, client: Client) {
		this.e = _e as typeof ea
		this.client = client
	}

	public async deleteSession(sessionId: string): Promise<void> {
		try {
			await this.e
				.delete(this.e.Session, (_) => ({
					filter_single: { id: sessionId },
				}))
				.run(this.client)
		} catch {
			// ignore if session id is invalid
		}
	}

	public async deleteUserSessions(userId: UserId): Promise<void> {
		await this.e
			.delete(this.e.Session, (session) => ({
				filter: this.e.op(session.user.id, '=', userId),
			}))
			.run(this.client)
	}

	public async getSessionAndUser(
		sessionId: string
	): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
		try {
			const session = await this.e
				.select(this.e.Session, (_) => ({
					...this.e.Session['*'],
					user: {
						...this.e.User['*'],
					},
					filter_single: { id: sessionId },
				}))
				.run(this.client)

			if (!session) return [null, null]

			const userResult: UserSchema = session.user

			return [
				transformIntoDatabaseSession({
					expiresAt: session.expiresAt,
					id: session.id,
					userId: session.user.id,
				}),
				transformIntoDatabaseUser(userResult),
			]
		} catch (error) {
			console.log(error)
			return [null, null]
		}
	}

	public async getUserSessions(userId: UserId): Promise<DatabaseSession[]> {
		const user = await this.e
			.select(this.e.User, (user) => ({
				sessions: {
					...this.e.Session['*'],
				},
				filter_single: { id: userId },
			}))
			.run(this.client)
		return (
			user?.sessions.map((session) => ({
				userId,
				expiresAt: session.expiresAt,
				id: session.id,
				attributes: {},
			})) ?? ([] as DatabaseSession[])
		)
	}

	public async setSession(value: DatabaseSession): Promise<void> {
		try {
			await this.e
				.insert(this.e.Session, {
					id: value.id,
					expiresAt: value.expiresAt,
					user: this.e.select(this.e.User, (_) => ({
						filter_single: { id: value.userId },
					})),
				})
				.run(this.client)
		} catch (error) {
			console.log(error)
		}
	}

	public async updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void> {
		await this.e
			.update(this.e.Session, () => ({
				filter_single: { id: sessionId },
				set: {
					expiresAt,
				},
			}))
			.run(this.client)
	}

	public async deleteExpiredSessions(): Promise<void> {
		await this.e
			.delete(this.e.Session, (session) => ({
				filter: this.e.op(session.expiresAt, '<', new Date()),
			}))
			.run(this.client)
	}
}

function transformIntoDatabaseSession(raw: SessionSchema): DatabaseSession {
	const { id, userId, expiresAt, ...attributes } = raw
	return {
		id,
		userId,
		expiresAt,
		attributes,
	}
}

function transformIntoDatabaseUser(raw: UserSchema): DatabaseUser {
	const { id, ...attributes } = raw
	return {
		id,
		attributes,
	}
}

interface UserSchema extends RegisteredDatabaseUserAttributes {
	id: UserId
}

interface SessionSchema extends RegisteredDatabaseSessionAttributes {
	id: string
	userId: UserId
	expiresAt: Date
}
