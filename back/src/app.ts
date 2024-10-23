import express from 'express';
import { BookModule } from './modules/book-module/module';
import { config } from './database/config/config';
import { Database } from './database/database';

class Application {
	private database: Database;
	private bookModule: BookModule;
	private app;

	constructor() {
		this.database = new Database(config);
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
