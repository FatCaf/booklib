import { AbstractRouter } from '@abstractions/abstractions';
import type { DiaryController } from '@diary/controller/controller';
import { Router } from 'express';

class DiaryRouter extends AbstractRouter {
	private controller: DiaryController;

	private readonly router: Router;

	constructor(controller: DiaryController) {
		super();
		this.controller = controller;
		this.router = Router();
	}

	public initRoutes(): void {
		this.router.route('/').post(this.controller.borrowBook);
		this.router.route('/edit').patch(this.controller.edit);
	}

	public getRouter(): Router {
		return this.router;
	}
}

export { DiaryRouter };
