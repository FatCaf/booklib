import { Database } from './database/database';
import { config } from './config/config';

class DatabaseModule {
	public database: Database;

	constructor() {
		this.database = new Database(config);
	}
}

export { DatabaseModule };
