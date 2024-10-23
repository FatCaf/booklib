import {
	DB_HOST,
	DB_NAME,
	DB_PASSWORD,
	DB_USER,
	PORT,
} from '../../../helpers/get-envs/get-envs';
import type { Config } from '../types/config/config';

export const config: Config = {
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME,
	port: Number(PORT),
};
