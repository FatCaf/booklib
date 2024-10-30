import type { Application } from 'express';
import { AbstractModule } from '@abstractions/abstractions';
import { Routes } from '@enums/enums';
import type { Database } from '@database/database';
import { BookController } from './controller/controller';
import { BookRepository } from './repository/repository';
import { BookRouter } from './router/router';
import { BookService } from './service/service';

class BookModule extends AbstractModule {
	private readonly bookController: BookController;

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
