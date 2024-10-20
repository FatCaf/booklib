import type { Router as ExpressRouter } from 'express';

export interface Router {
	initRoutes(): void;
	getRouter(): ExpressRouter;
}
