import type { Request, RequestHandler, Response } from "express";
import { HttpStatus } from "../../../common/enums/http-status/http-status";
import { HttpError } from "../../../helpers/http-error/http-error";
import type { Controller } from "../common/types/controller/controller";
import type { SearchQuery } from "../common/types/search-query/search-query";
import type { BookService } from "../service/service";

class BookController implements Controller {
	private bookService: BookService;

	constructor(bookService: BookService) {
		this.bookService = bookService;
	}

	public getById: RequestHandler = async (
		req: Request,
		res: Response,
	): Promise<void> => {
		try {
			const { id } = req.params;

			const book = await this.bookService.getById(id);

			res.status(HttpStatus.OK).json({ success: true, book });
		} catch (error) {
			if (error instanceof HttpError) {
				res.status(error.statusCode).json({ message: error.message });
			}
		}
	};

	public getAll: RequestHandler = async (
		req: Request,
		res: Response,
	): Promise<void> => {
		try {
			const { offset } = req.query as unknown as Pick<SearchQuery, "offset">;
			const books = await this.bookService.getAll(offset);

			res.status(HttpStatus.OK).json({ success: true, books });
		} catch (error) {
			if (error instanceof HttpError) {
				res.status(error.statusCode).json({ message: error.message });
			}
		}
	};

	public getAllSpecify: RequestHandler = async (
		req: Request,
		res: Response,
	): Promise<void> => {
		try {
			const { offset, author, year, name } =
				req.query as unknown as SearchQuery;

			const books = await this.bookService.getAllSpecify({
				offset,
				author,
				year: Number(year),
				name,
			});

			res.status(HttpStatus.OK).json({ success: true, books });
		} catch (error) {
			if (error instanceof HttpError) {
				res.status(error.statusCode).json({ message: error.message });
			}
		}
	};

	public create: RequestHandler = async (
		req: Request,
		res: Response,
	): Promise<void> => {
		try {
			const book = await this.bookService.create(req.body);

			res
				.status(HttpStatus.CREATED)
				.json({ success: true, message: "Book created", book });
		} catch (error) {
			if (error instanceof HttpError) {
				res.status(error.statusCode).json({ message: error.message });
			}
		}
	};

	public edit: RequestHandler = async (
		req: Request,
		res: Response,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const book = await this.bookService.edit(id, req.body);

			res
				.status(HttpStatus.OK)
				.json({ success: true, message: "Book updated", book });
		} catch (error) {
			if (error instanceof HttpError) {
				res.status(error.statusCode).json({ message: error.message });
			}
		}
	};

	public delete: RequestHandler = async (
		req: Request,
		res: Response,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const book = await this.bookService.delete(id);

			res
				.status(HttpStatus.OK)
				.json({ success: true, message: "Book deleted", book });
		} catch (error) {
			if (error instanceof HttpError) {
				res.status(error.statusCode).json({ message: error.message });
			}
		}
	};
}

export { BookController };
