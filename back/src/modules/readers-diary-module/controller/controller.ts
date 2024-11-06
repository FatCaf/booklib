import type { DiaryService } from '@diary/service/service';
import type { Controller } from '@diary/types/types';
import { HttpStatus } from '@enums/enums';
import { handleError } from '@helpers/helpers';
import type { RequestHandler, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

class DiaryController implements Controller {
	private service: DiaryService;

	constructor(service: DiaryService) {
		this.service = service;
	}

	public borrowBook: RequestHandler = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const book = await this.service.borrowBook(req.body);

			res.status(HttpStatus.OK).json({ success: true, book });
		} catch (error) {
			handleError(error, res);
		}
	};
	public edit: RequestHandler = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const diary = await this.service.edit(req.body);

			res.status(HttpStatus.OK).json({ success: true, diary });
		} catch (error) {
			handleError(error, res);
		}
	};
}

export { DiaryController };
