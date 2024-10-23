import type { Book } from '../book/book';

export interface Service {
	getAll(): Promise<Book[]>;
	getById(id: string): Promise<Book>;
	create(data: Book): Promise<Book>;
	delete(id: string): Promise<Book>;
	edit(id: string, data: Book): Promise<Book>;
}
