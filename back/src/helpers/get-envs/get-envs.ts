import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const envPath = path.resolve(__dirname, "../../../.env.local");

dotenv.config({ path: envPath });

const PORT = process.env.DB_PORT;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

export {
	DB_PASSWORD,
	DB_HOST,
	PORT,
	DB_USER,
	DB_NAME,
	JWT_SECRET,
	JWT_EXPIRATION,
};
