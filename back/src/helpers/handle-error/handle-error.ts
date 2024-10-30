import type { Response } from 'express';
import { HttpError } from '../http-error/http-error';
import { HttpStatus } from '../../common/enums/http-status/http-status';
import loggerService from '../../service/logger-service/logger.service';

export function handleError(error: unknown, res: Response) {
	loggerService.error(error);

	if (error instanceof HttpError) {
		res.status(error.statusCode).json({ message: error.message });
	} else if (error instanceof Error) {
		res
			.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.json({ message: error.message });
	} else {
		res
			.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.json({ message: 'An unexpected error occurred' });
	}
}
