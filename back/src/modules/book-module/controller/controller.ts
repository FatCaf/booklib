import type { BookService } from '../service/service';
import type { Request, RequestHandler, Response } from 'express';
import { HttpStatus } from '../../../common/enums/http-status/http-status';

class BookController {
	private bookService: BookService;

	constructor(bookService: BookService) {
		this.bookService = bookService;
	}

	public getAll: RequestHandler = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const books = await this.bookService.getAll();

			res.status(HttpStatus.OK).json({ success: true, books });
		} catch (error) {
			console.error(error);
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
		}
	};
}

export { BookController };
