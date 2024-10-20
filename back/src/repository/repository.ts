import type { Repository } from '../common/types/repository/repository';

class AbstractRepository<T> implements Repository<T> {
	getAll(query: string): Promise<T[]> {
		throw new Error('Method not implemented.');
	}

	create(data: T, query: string): Promise<T> {
		throw new Error('Method not implemented');
	}
}

export { AbstractRepository };
