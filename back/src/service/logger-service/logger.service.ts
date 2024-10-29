import { HttpError } from '../../helpers/http-error/http-error';

class LoggerService {
	info(message: string) {
		const formattedMessage = `${new Date().toISOString()} - INFO: ${message}\n`;
		this.writeToStdout(formattedMessage, 'green');
	}

	error(error: unknown) {
		const formattedMessage = `${new Date().toISOString()} - ERROR: ${this.parseError(
			error
		)}\n`;
		this.writeToStdout(formattedMessage, 'red');
	}

	private parseError(error: unknown) {
		if (error instanceof HttpError) {
			return `${error.statusCode}: ${error.message}`;
		}
		if (error instanceof Error) {
			return `${error.name}\n${error.message}\n${error.cause}`;
		}
		return `${error as Error}`;
	}

	private writeToStdout(message: string, type: 'green' | 'red') {
		const colorCode = type === 'green' ? '\x1b[32m' : '\x1b[31m';
		const resetCode = '\x1b[0m';
		process.stdout.write(`${colorCode}${message}${resetCode}`);
	}
}

export default new LoggerService();
