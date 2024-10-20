import { DataBase } from '../../../common/enums/database/database';
import { Queries } from '../../../common/enums/queries/queries';
import type { Book } from '../../../common/types/book/book';
import type { BookRepository } from '../../repository/book-repository/book-repository';
import queryService from '../../../service/query-service/query.service';

class BookService {
	private repository: BookRepository;

	constructor(repository: BookRepository) {
		this.repository = repository;
	}

	public async getAll(): Promise<Book[]> {
		const query = queryService.generateQuery(Queries.GET_ALL, {
			table: DataBase.BOOKS,
		});

		const books = await this.repository.getAll(query);

		if (!books) throw new Error('No books');

		return books;
	}
}

export { BookService };
