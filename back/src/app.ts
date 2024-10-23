import express from 'express';
import type { Database } from './modules/database-module/database/database';
import { BookModule } from './modules/book-module/module';
import { DatabaseModule } from './modules/database-module/module';

class Application {
	private readonly database: Database;
	private bookModule: BookModule;
	private readonly app;

	constructor() {
		this.database = new DatabaseModule().database;
		this.app = express();
		this.bookModule = new BookModule(this.database, this.app);
	}

	public async initDb() {
		await this.database.connect();
	}

	public async start() {
		await this.initDb();

		this.app.use(express.json());

		this.bookModule.initModule();

		this.app.listen(3000, () => {
			console.log('Server running on port 3000');
		});
	}
}

const application = new Application();
(async () => {
	await application.start();
})();
