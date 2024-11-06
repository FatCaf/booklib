import { AbstractRepository } from '@abstractions/abstractions';
import type { BorrowBook } from 'modules/readers-diary-module/common/types/types';
import type { Database } from '@database/database';
import type { Client } from 'pg';
import type { SearchParams } from '@app-types/types';

class DiaryRepository extends AbstractRepository<BorrowBook> {
	private db: Client;

	constructor(db: Database) {
		super();
		this.db = db.client;
	}

	public async create(
		data: Partial<BorrowBook>,
		query: string
	): Promise<BorrowBook> {
		return (await this.db.query(query, [...Object.values(data)])).rows[0];
	}

	public async edit(
		data: Partial<BorrowBook>,
		query: string
	): Promise<BorrowBook> {
		return (await this.db.query(query, [...Object.values(data)])).rows[0];
	}

	public async searchByMultipleParams(
		params: SearchParams,
		query: string
	): Promise<BorrowBook> {
		return (await this.db.query(query, [params.user_id, params.book_id]))
			.rows[0];
	}
}

export { DiaryRepository };
