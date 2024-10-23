import application from './modules/application-module/application';

async function start(): Promise<void> {
	await application.start();
}

start();
