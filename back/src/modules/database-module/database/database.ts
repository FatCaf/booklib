import pkg from 'pg';
import loggerService from '@services/logger-service/logger.service';
import type { Config } from '../types/config/config';

class Database {
	private readonly config: Config;

	public client: pkg.Client;

	constructor(config: Config) {
		this.config = config;
		this.client = new pkg.Client(this.config);
	}

	public async connect() {
		loggerService.info('Establishing db connection');
		await this.client
			.connect()
			.then(() => loggerService.info('Connection established'))
			.catch((error) => {
				loggerService.error(error);
			});
	}
}

export { Database };
