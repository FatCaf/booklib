import type { Book } from "../book/book";
import type { SearchQuery } from "../search-query/search-query";

export interface Service {
	getAll(offset: number): Promise<Book[]>;
	getAllSpecify(searchQuery: SearchQuery): Promise<Book[]>;
	getById(id: string): Promise<Book>;
	create(data: Book): Promise<Book>;
	delete(id: string): Promise<Book>;
	edit(id: string, data: Book): Promise<Book>;
}
