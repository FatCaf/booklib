import pkg from 'pg';
import type { Config } from '../types/config/config';

class Database {
	private readonly config: Config;

	public client: pkg.Client;

	constructor(config: Config) {
		this.config = config;
		this.client = new pkg.Client(this.config);
	}

	public async connect() {
		console.log('Establishing db connection');
		await this.client
			.connect()
			.then(() => console.log('Connection established'))
			.catch((error) => console.error(error.message));
	}
}

export { Database };
