import express from "express";
import { BookModule } from "../book-module/module";
import type { Database } from "../database-module/database/database";
import { DatabaseModule } from "../database-module/module";
import { UserModule } from "../user-module/module";

class Application {
	private readonly database: Database;
	private bookModule: BookModule;
	private userModule: UserModule;
	private readonly app;

	constructor() {
		this.database = new DatabaseModule().database;
		this.app = express();
		this.bookModule = new BookModule(this.database, this.app);
		this.userModule = new UserModule(this.database, this.app);
	}

	public async start() {
		await this.database.connect();

		this.app.use(express.json());

		this.bookModule.initModule();
		this.userModule.initModule();

		this.app.listen(3000, () => {
			console.log("Server running on port 3000");
		});
	}
}

export default new Application();
