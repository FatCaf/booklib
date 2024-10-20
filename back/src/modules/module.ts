import type { Module } from '../common/types/module/module';

class AbstractModule implements Module {
	initModule(): void {
		throw new Error('Method not implemented.');
	}
}

export { AbstractModule };
