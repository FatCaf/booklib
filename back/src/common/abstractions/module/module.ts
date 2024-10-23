import type { Module } from '../../types/module/module';

class AbstractModule implements Module {
	initModuleAsync(): Promise<void> {
		throw new Error('Method not implemented.');
	}
	initModule(): void {
		throw new Error('Method not implemented.');
	}
}

export { AbstractModule };
