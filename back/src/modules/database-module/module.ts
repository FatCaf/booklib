import { AbstractModule } from '../../common/abstractions/module/module';
import { Database } from './database/database';
import { config } from './config/config';

class DatabaseModule extends AbstractModule {
	public database: Database;

	constructor() {
		super();
		this.database = new Database(config);
	}

	public async initModuleAsync(): Promise<void> {
		await this.database.connect();
	}
}

export { DatabaseModule };
