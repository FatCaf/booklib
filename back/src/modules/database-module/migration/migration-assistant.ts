import { exec } from 'node:child_process';
import {
	DB_HOST,
	DB_NAME,
	DB_PASSWORD,
	DB_USER,
	PORT,
} from '@helpers/get-envs/get-envs';
import loggerService from '@services/logger-service/logger.service';

const args = process.argv.slice(2);
const command = args[0];

const envs = `cross-env DB_HOST=${DB_HOST} DB_NAME=${DB_NAME} DB_USER=${DB_USER} DB_PASSWORD=${DB_PASSWORD} PORT=${PORT}`;

function runCommand(scriptCommand: string) {
	exec(scriptCommand, (error, stdout, stderr) => {
		if (error) {
			loggerService.error(`Script failed: ${error}`);
			process.exit(1);
		} else {
			loggerService.info(`Script output: ${stdout}`);
			if (stderr) {
				loggerService.info(`Script warnings: ${stderr}`);
			}
			process.exit(0);
		}
	});
}

if (command === 'up') {
	runCommand(
		`${envs} bash src/modules/database-module/migration/run_migration_up.sh`
	);
} else if (command === 'down') {
	runCommand(
		`${envs} bash src/modules/database-module/migration/run_migration_down.sh`
	);
} else {
	loggerService.error('Invalid argument. Use "up" or "down".');
	process.exit(1);
}
