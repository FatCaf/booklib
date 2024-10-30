import type { Router as ExpressRouter } from 'express';
import type { Router } from '@app-types/types';

class AbstractRouter implements Router {
	initRoutes(): void {
		throw new Error('Method not implemented.');
	}
	getRouter(): ExpressRouter {
		throw new Error('Method not implemented.');
	}
}

export { AbstractRouter };
