import { Router } from "express";
import { AbstractRouter } from "../../../common/abstractions/router/router";
import { Routes } from "../common/enums/routes/routes";
import type { BookController } from "../controller/controller";

class BookRouter extends AbstractRouter {
	private bookController: BookController;

	private readonly router: Router;

	constructor(bookController: BookController) {
		super();
		this.bookController = bookController;
		this.router = Router();
	}

	public initRoutes() {
		this.router.route(Routes.ROOT).get(this.bookController.getAll);
		this.router
			.route(Routes.GET_ALL_SPECIFY)
			.get(this.bookController.getAllSpecify);
		this.router.route(Routes.GET_BY_ID).get(this.bookController.getById);
		this.router.route(Routes.CREATE).post(this.bookController.create);
		this.router.route(Routes.EDIT).patch(this.bookController.edit);
		this.router.route(Routes.DELETE).delete(this.bookController.delete);
	}

	public getRouter() {
		return this.router;
	}
}

export { BookRouter };
