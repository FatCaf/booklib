import type { SearchParams } from '@app-types/types';
import readersDiarySchema from '@diary/joi/readers-diary';
import type { DiaryRepository } from '@diary/repository/repository';
import type { BorrowBook, Service } from '@diary/types/types';
import { DataBase, HttpStatus, Queries } from '@enums/enums';
import { HttpError, validate } from '@helpers/helpers';
import queryService from '@services/query-service/query.service';

class DiaryService implements Service {
	private repository: DiaryRepository;

	constructor(repository: DiaryRepository) {
		this.repository = repository;
	}

	public async search(params: SearchParams): Promise<BorrowBook> {
		const field = queryService.concatSearchStrings(
			queryService.createFieldsWithSequence<SearchParams>(params).split(',')
		);
		const query = queryService.generateQuery(Queries.SEARCH, {
			table: DataBase.BORROWED_BOOKS,
			field,
		});

		const diary = await this.repository.searchByMultipleParams(params, query);

		if (!diary)
			throw new HttpError(HttpStatus.NOT_FOUND, 'Book not found in diary');

		return diary;
	}

	public async borrowBook(data: Partial<BorrowBook>): Promise<BorrowBook> {
		const isDiaryValid = validate<Partial<BorrowBook>>(
			readersDiarySchema.borrow_book.create,
			data
		);

		if (isDiaryValid) throw new HttpError(HttpStatus.BAD_REQUEST, isDiaryValid);

		const [fields, sequence] = queryService.createFieldsAndSequence(data);
		const query = queryService.generateQuery(Queries.CREATE, {
			table: DataBase.BORROWED_BOOKS,
			fields,
			sequence,
		});

		const book = await this.repository.create(data, query);

		if (!book)
			throw new HttpError(
				HttpStatus.INTERNAL_SERVER_ERROR,
				'Cannot borrow book'
			);
		return book;
	}

	public async edit(data: Partial<BorrowBook>): Promise<BorrowBook> {
		const isDataValid = validate<Partial<BorrowBook>>(
			readersDiarySchema.borrow_book.edit,
			data
		);

		if (isDataValid) throw new HttpError(HttpStatus.BAD_REQUEST, isDataValid);

		await this.search({ user_id: data.user_id, book_id: data.book_id });

		const fields = queryService.createFieldsWithSequence({
			...data,
		});

		const searchString = queryService.concatSearchStrings(
			fields.split(',').slice(0, 2)
		);

		const query = queryService.generateQuery(Queries.EDIT_MULTIPLE_PARAMS, {
			table: DataBase.BORROWED_BOOKS,
			fields,
			searchString,
		});

		const diary = await this.repository.edit({ ...data }, query);

		if (!diary)
			throw new HttpError(
				HttpStatus.INTERNAL_SERVER_ERROR,
				'Cannot update diary'
			);

		return diary;
	}
}

export { DiaryService };
