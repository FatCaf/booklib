import type { Config } from '../types/config/config';

export const config: Config = {
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'postgres',
	password: process.env.DB_PASSWORD || 'postgres',
	database: process.env.DB_NAME || 'booklib',
	port: 5432,
};
