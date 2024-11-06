import { AbstractModule } from '@abstractions/abstractions';
import { DiaryController } from './controller/controller';
import { DiaryRouter } from './router/router';
import { Application } from 'express';
import { Database } from '@database/database';
import { DiaryRepository } from './repository/repository';
import { DiaryService } from './service/service';
import { Routes } from '@enums/enums';

class ReadersDiaryModule extends AbstractModule {
	private readonly controller: DiaryController;

	private borrowRouter: DiaryRouter;

	private app: Application;

	constructor(database: Database, app: Application) {
		super();
		const repository = new DiaryRepository(database);
		const service = new DiaryService(repository);
		this.controller = new DiaryController(service);
		this.borrowRouter = new DiaryRouter(this.controller);
		this.app = app;
	}

	public initModule(): void {
		this.borrowRouter.initRoutes();
		const router = this.borrowRouter.getRouter();

		this.app.use(`${Routes.API.V1}${Routes.BORROW.BORROW}`, router);
	}
}

export { ReadersDiaryModule };
