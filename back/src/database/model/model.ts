class AbstractModel {
	public id!: string;

	public createdAt!: string;

	public updatedAt!: string;

	public beforeInsert(): void {
		const date = new Date().toISOString();
		this.createdAt = date;
		this.updatedAt = date;
	}

	public beforeUpdate(): void {
		const date = new Date().toISOString();
		this.updatedAt = date;
	}
}

export { AbstractModel };
