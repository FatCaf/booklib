export interface Repository<T> {
	getAll(query: string): Promise<T[]>;
}
