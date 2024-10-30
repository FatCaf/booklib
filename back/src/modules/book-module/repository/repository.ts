import type { Client } from 'pg';
import { AbstractRepository } from '@abstractions/abstractions';
import type { Database } from '@database/database';
import type { Book } from '@books/types/types';

class BookRepository extends AbstractRepository<Book> {
	private db: Client;

	constructor(db: Database) {
		super();
		this.db = db.client;
	}

	public async getAll(
		query: string,
		data?: Record<string, any>
	): Promise<Book[]> {
		const queryParams = data ? Object.values(data) : [];

		return (await this.db.query(query, [...queryParams])).rows;
	}

	public async search(param: string | number, query: string): Promise<Book> {
		return (await this.db.query(query, [param])).rows[0];
	}

	public async create(data: Partial<Book>, query: string): Promise<Book> {
		return (await this.db.query(query, [...Object.values(data)])).rows[0];
	}

	public async edit(data: Partial<Book>, query: string): Promise<Book> {
		return (await this.db.query(query, [...Object.values(data)])).rows[0];
	}

	public async delete(id: string, query: string): Promise<Book> {
		return (await this.db.query(query, [id])).rows[0];
	}
}

export { BookRepository };
