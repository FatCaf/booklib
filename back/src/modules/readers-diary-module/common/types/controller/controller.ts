import type { RequestHandler } from 'express';

export interface Controller {
	edit: RequestHandler;
	borrowBook: RequestHandler;
}
