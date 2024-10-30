import { Router } from 'express';
import { AbstractRouter } from '@abstractions/abstractions';
import type { UserController } from '@user/controller/controller';

class UserRouter extends AbstractRouter {
	private controller: UserController;

	private readonly router: Router;

	constructor(controller: UserController) {
		super();
		this.controller = controller;
		this.router = Router();
	}

	public initRoutes() {
		this.router.route('/login').post(this.controller.login);
		this.router.route('/register').post(this.controller.register);
	}

	public getRouter() {
		return this.router;
	}
}

export { UserRouter };
