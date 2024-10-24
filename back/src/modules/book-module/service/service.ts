import { DataBase } from "../../../common/enums/database/database";
import { Queries } from "../../../common/enums/queries/queries";
import queryService from "../../../service/query-service/query.service";
import { BookModel } from "../model/model";
import type { BookRepository } from "../repository/repository";
import type { Book } from "../types/book/book";
import type { SearchQuery } from "../types/search-query/search-query";
import type { Service } from "../types/service/service";

class BookService implements Service {
	private repository: BookRepository;

	constructor(repository: BookRepository) {
		this.repository = repository;
	}

	public async getById(id: string): Promise<Book> {
		const field = queryService.createFieldsWithSequence<{ id: string }>({ id });
		const query = queryService.generateQuery(Queries.GET_BY_ID, {
			table: DataBase.BOOKS,
			field,
		});

		const book = await this.repository.getById(id, query);

		if (!book) throw "Book not found";

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

	public async create(data: Book): Promise<Book> {
		const book = new BookModel(data).toPlainObject<Book>();

		const [fields, sequence] = queryService.createFieldsAndSequence(book);

		const query = queryService.generateQuery(Queries.CREATE, {
			table: DataBase.BOOKS,
			fields,
			sequence,
		});

		const newBook = await this.repository.create(book, query);

		if (!newBook) throw "Cant create book";

		return newBook;
	}

	public async edit(id: string, data: Partial<Book>): Promise<Book> {
		const oldBook = await this.getById(id);

		const editedBook = new BookModel(oldBook).update<Book>(data);

		const fields = queryService.createFieldsWithSequence({
			...editedBook,
			id,
		});

		const query = queryService.generateQuery(Queries.EDIT, {
			table: DataBase.BOOKS,
			fields,
		});

		const book = await this.repository.edit(editedBook, query);

		if (!book) throw "Cant update book";

		return book;
	}

	public async delete(id: string): Promise<Book> {
		const field = queryService.createFieldsWithSequence<{ id: string }>({ id });
		const query = queryService.generateQuery(Queries.DELETE, {
			table: DataBase.BOOKS,
			field,
		});

		const deletedBook = await this.repository.delete(id, query);

		if (!deletedBook) throw "Cant delete book";

		return deletedBook;
	}
}

export { BookService };
