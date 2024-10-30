import application from '@application/application';

async function start(): Promise<void> {
	await application.start();
}

start();
