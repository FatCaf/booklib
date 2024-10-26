import type { RequestHandler } from "express";

export interface Controller {
	getAll: RequestHandler;
	getAllSpecify: RequestHandler;
	getById: RequestHandler;
	create: RequestHandler;
	delete: RequestHandler;
	edit: RequestHandler;
}
