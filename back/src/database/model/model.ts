import { v4 as uuidv4 } from 'uuid';

class AbstractModel {
	public id!: string;

	public createdAt!: string;

	public updatedAt!: string;

	public generateId(): void {
		this.id = uuidv4();
	}

	public beforeInsert(): void {
		const date = new Date().toISOString();
		this.createdAt = date;
		this.updatedAt = date;
	}

	public beforeUpdate(): void {
		const date = new Date().toISOString();
		this.updatedAt = date;
	}

	public update<T>(data: Partial<T>): T {
		this.beforeUpdate();

		for (const key of Object.keys(data)) {
			const value = data[key as keyof T];
			if (value !== undefined) {
				(this as Record<string, unknown>)[key] = value;
			}
		}

		return this.toPlainObject<T>();
	}

	public toPlainObject<T>(): T {
		const plainObject: T = {
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		} as T;

		return plainObject;
	}
}

export { AbstractModel };
