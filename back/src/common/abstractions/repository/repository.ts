import type { Repository } from '@app-types/types';

class AbstractRepository<T> implements Repository<T> {
	edit(data: Partial<T>, query: string): Promise<T> {
		throw new Error('Method not implemented.');
	}
	search(param: string | number, query: string): Promise<T> {
		throw new Error('Method not implemented.');
	}

	getAll(query: string, data?: Record<string, any>): Promise<T[]> {
		throw new Error('Method not implemented.');
	}

	create(data: Partial<T>, query: string): Promise<T> {
		throw new Error('Method not implemented');
	}

	delete(id: string, query: string): Promise<T> {
		throw new Error('Method not implemented');
	}
}

export { AbstractRepository };
