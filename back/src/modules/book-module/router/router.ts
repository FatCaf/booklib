import { Router } from 'express';
import type { BookController } from '../controller/controller';
import { AbstractRouter } from '../../../route/route';

class BookRouter extends AbstractRouter {
	private bookController: BookController;

	private router: Router;

	constructor(bookController: BookController) {
		super();
		this.bookController = bookController;
		this.router = Router();
	}

	public initRoutes() {
		this.router.route('/').get(this.bookController.getAll);
		this.router.route('/create').post(this.bookController.create);
	}

	public getRouter() {
		return this.router;
	}
}

export { BookRouter };
