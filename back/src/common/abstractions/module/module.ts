import type { Module } from '../../types/module/module';

class AbstractModule implements Module {
	initModule(): void {
		throw new Error('Method not implemented.');
	}
}

export { AbstractModule };
