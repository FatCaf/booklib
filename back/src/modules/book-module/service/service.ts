import { HttpStatus, DataBase, Queries } from '@enums/enums';
import { validate, HttpError } from '@helpers/helpers';
import queryService from '@services/query-service/query.service';
import type { Book, SearchQuery, Service } from '@books/types/types';
import bookSchema from '@books/joi/book';
import type { BookRepository } from '@books/repository/repository';

class BookService implements Service {
	private repository: BookRepository;

	constructor(repository: BookRepository) {
		this.repository = repository;
	}

	public async getById(id: string): Promise<Book> {
		const field = queryService.createFieldsWithSequence<{ id: string }>({ id });
		const query = queryService.generateQuery(Queries.SEARCH, {
			table: DataBase.BOOKS,
			field,
		});

		const book = await this.repository.search(id, query);

		if (!book) throw new HttpError(HttpStatus.NOT_FOUND, 'Book not found');

		return book;
	}

	public async getAll(offset: number): Promise<Book[]> {
		const query = queryService.generateQuery(Queries.GET_ALL, {
			table: DataBase.BOOKS,
		});

		const books = await this.repository.getAll(query);

		return books.slice(0, offset);
	}

	public async getAllSpecify(searchQuery: SearchQuery): Promise<Book[]> {
		const { offset, ...rest } = searchQuery;
		const searchString = queryService.createSearchString<SearchQuery>(rest);
		const query = queryService.generateQuery(Queries.GET_ALL_SPECIFY, {
			table: DataBase.BOOKS,
			searchString,
		});

		const books = await this.repository.getAll(query, rest);

		return books.slice(0, offset);
	}

	public async create(data: Partial<Book>): Promise<Book> {
		const isBookInvalid = validate<Partial<Book>>(bookSchema.create, data);

		if (isBookInvalid)
			throw new HttpError(HttpStatus.BAD_REQUEST, isBookInvalid);

		const [fields, sequence] = queryService.createFieldsAndSequence(data);

		const query = queryService.generateQuery(Queries.CREATE, {
			table: DataBase.BOOKS,
			fields,
			sequence,
		});

		const newBook = await this.repository.create(data, query);

		if (!newBook)
			throw new HttpError(HttpStatus.BAD_REQUEST, 'Cannot create book');

		return newBook;
	}

	public async edit(id: string, data: Partial<Book>): Promise<Book> {
		const isBookInvalid = validate<Partial<Book>>(bookSchema.edit, data);

		if (isBookInvalid)
			throw new HttpError(HttpStatus.BAD_REQUEST, isBookInvalid);

		await this.getById(id);

		const fields = queryService.createFieldsWithSequence({
			id,
			...data,
		});

		const query = queryService.generateQuery(Queries.EDIT, {
			table: DataBase.BOOKS,
			fields,
		});

		const book = await this.repository.edit({ id, ...data }, query);

		if (!book)
			throw new HttpError(HttpStatus.BAD_REQUEST, 'Cannot update book');

		return book;
	}

	public async delete(id: string): Promise<Book> {
		const field = queryService.createFieldsWithSequence<{ id: string }>({ id });
		const query = queryService.generateQuery(Queries.DELETE, {
			table: DataBase.BOOKS,
			field,
		});

		const deletedBook = await this.repository.delete(id, query);

		if (!deletedBook)
			throw new HttpError(
				HttpStatus.NOT_FOUND,
				'Cannot delete book, it does not exist'
			);

		return deletedBook;
	}
}

export { BookService };
