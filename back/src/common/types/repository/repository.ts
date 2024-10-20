export interface Repository<T> {
	getAll(query: string): Promise<T[]>;
	create(data: T, query: string): Promise<T>;
}
