import type { RequestHandler } from 'express';

export interface Controller {
	getAll: RequestHandler;
	getById: RequestHandler;
	create: RequestHandler;
	delete: RequestHandler;
	edit: RequestHandler;
}
