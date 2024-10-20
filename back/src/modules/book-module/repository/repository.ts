import type { Client } from 'pg';
import type { Book } from '../../../common/types/book/book';
import type { Database } from '../../../database/database';
import { AbstractRepository } from '../../../repository/repository';

class BookRepository extends AbstractRepository<Book> {
	private db: Client;

	constructor(db: Database) {
		super();
		this.db = db.client;
	}

	public async getAll(query: string): Promise<Book[]> {
		return (await this.db.query(query)).rows;
	}
}

export { BookRepository };
