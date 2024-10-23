import type { Repository } from "../../types/repository/repository";

class AbstractRepository<T> implements Repository<T> {
	edit(data: T, query: string): Promise<T> {
		throw new Error("Method not implemented.");
	}
	getById(id: string, query: string): Promise<T> {
		throw new Error("Method not implemented.");
	}

	getAll(query: string): Promise<T[]> {
		throw new Error("Method not implemented.");
	}

	create(data: T, query: string): Promise<T> {
		throw new Error("Method not implemented");
	}

	delete(id: string, query: string): Promise<T> {
		throw new Error("Method not implemented");
	}
}

export { AbstractRepository };
