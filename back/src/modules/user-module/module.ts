import type { Application } from 'express';
import { AbstractModule } from '@abstractions/abstractions';
import { Routes } from '@enums/enums';
import type { Database } from '@database/database';
import { UserController } from './controller/controller';
import { UserRepository } from './repository/repository';
import { UserRouter } from './router/router';
import { UserService } from './service/service';

class UserModule extends AbstractModule {
	private readonly controller: UserController;

	private userRouter: UserRouter;

	private app: Application;

	constructor(database: Database, app: Application) {
		super();
		const repository = new UserRepository(database);
		const service = new UserService(repository);
		this.controller = new UserController(service);
		this.userRouter = new UserRouter(this.controller);
		this.app = app;
	}

	public initModule() {
		this.userRouter.initRoutes();
		const router = this.userRouter.getRouter();

		this.app.use(`${Routes.API.V1}${Routes.USERS.ADMIN}`, router);
		this.app.use(`${Routes.API.V1}${Routes.USERS.USER}`, router);
	}
}

export { UserModule };
