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
		this.router.route('/get/:id').get(this.bookController.getById);
		this.router.route('/create').post(this.bookController.create);
		this.router.route('/edit/:id').patch(this.bookController.edit);
		this.router.route('/delete/:id').delete(this.bookController.delete);
	}

	public getRouter() {
		return this.router;
	}
}

export { BookRouter };
