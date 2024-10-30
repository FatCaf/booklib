import type { RequestHandler } from 'express';

export interface Controller {
	login: RequestHandler;
	register: RequestHandler;
	borrowBook: RequestHandler;
}
