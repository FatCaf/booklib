export interface Repository<T> {
	getAll(query: string, data?: Record<string, any>): Promise<T[]>;
	getById(id: string, query: string): Promise<T>;
	create(data: T, query: string): Promise<T>;
	delete(id: string, query: string): Promise<T>;
	edit(data: T, query: string): Promise<T>;
}
