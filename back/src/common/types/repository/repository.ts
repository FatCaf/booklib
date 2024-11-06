import type { SearchParams } from '@app-types/types';

export interface Repository<T> {
	getAll(query: string, data?: Record<string, any>): Promise<T[]>;
	search(param: string | number, query: string): Promise<T>;
	searchByMultipleParams(params: SearchParams, query: string): Promise<T>;
	create(data: Partial<T>, query: string): Promise<T>;
	delete(id: string, query: string): Promise<T>;
	edit(data: Partial<T>, query: string): Promise<T>;
}
