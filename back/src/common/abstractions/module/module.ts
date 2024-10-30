import type { Module } from '@app-types/types';

class AbstractModule implements Module {
	initModule(): void {
		throw new Error('Method not implemented.');
	}
}

export { AbstractModule };
