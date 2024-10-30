import { v4 as uuidv4 } from 'uuid';

class AbstractModel {
	public id!: string;

	public createdAt!: string;

	public updatedAt!: string;

	public generateId(): void {
		this.id = uuidv4();
	}

	public beforeInsert(): void {
		this.createdAt = this.updatedAt = new Date().toISOString();
	}

	public beforeUpdate(): void {
		this.updatedAt = new Date().toISOString();
	}

	public update<T>(data: Partial<T>): T {
		this.beforeUpdate();

		for (const key of Object.keys(data)) {
			const value = data[key as keyof T];
			if (value !== undefined) {
				const currentValue = (this as Record<string, unknown>)[key];

				if (Array.isArray(currentValue)) {
					(this as Record<string, unknown>)[key] = [...currentValue, value];
				} else {
					(this as Record<string, unknown>)[key] = value;
				}
			}
		}

		return this.toPlainObject<T>();
	}

	public toPlainObject<T>(): T {
		return {
			id: this.id,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		} as T;
	}
}

export { AbstractModel };
