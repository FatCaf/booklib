import { DataBase } from '../../../common/enums/database/database';
import { Queries } from '../../../common/enums/queries/queries';
import type { Book } from '../../../common/types/book/book';
import type { BookRepository } from '../repository/repository';
import queryService from '../../../service/query-service/query.service';
import { BookModel } from '../model/model';

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

	public async create(data: Book): Promise<Book> {
		const query = queryService.generateQuery(Queries.CREATE, {
			table: DataBase.BOOKS,
			fields: '(name, description, author, image)',
			sequence: '($1, $2, $3, $4)',
		});

		const book = new BookModel(data).toPlainObject<Book>();

		const newBook = await this.repository.create(book, query);

		if (!newBook) throw new Error('Cant create book');

		return newBook;
	}
}

export { BookService };
