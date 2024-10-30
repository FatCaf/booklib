import type { Client } from 'pg';
import { AbstractRepository } from '@abstractions/repository/repository';
import type { Database } from '@database/database';
import type { User } from '@user/types/user/user';

class UserRepository extends AbstractRepository<User> {
	private db: Client;

	constructor(db: Database) {
		super();
		this.db = db.client;
	}

	public async create(data: Partial<User>, query: string): Promise<User> {
		return (await this.db.query(query, [...Object.values(data)])).rows[0];
	}

	public async search(param: string | number, query: string): Promise<User> {
		return (await this.db.query(query, [param])).rows[0];
	}
}

export { UserRepository };
