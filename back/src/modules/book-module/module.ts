import type { Application } from 'express';
import type { Database } from '../../database/database';
import { AbstractModule } from '../module';
import { BookRepository } from './repository/repository';
import { BookService } from './service/service';
import { BookController } from './controller/controller';
import { BookRouter } from './router/router';
import { Routes } from '../../common/enums/routes/routes';

class BookModule extends AbstractModule {
	private bookController: BookController;

	private bookRouter: BookRouter;

	private app: Application;

	constructor(database: Database, app: Application) {
		super();
		const bookRepository = new BookRepository(database);
		const bookService = new BookService(bookRepository);
		this.bookController = new BookController(bookService);
		this.bookRouter = new BookRouter(this.bookController);
		this.app = app;
	}

	public initModule() {
		this.bookRouter.initRoutes();
		const router = this.bookRouter.getRouter();

		this.app.use(`${Routes.API.V1}${Routes.BOOKS.BOOKS}`, router);
	}
}

export { BookModule };
