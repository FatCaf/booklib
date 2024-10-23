import { AbstractModel } from "../../../common/abstractions/model/model";
import type { Book } from "../types/book/book";

class BookModel extends AbstractModel {
	public name!: string;

	public description!: string;

	public author!: string;

	public image!: string;

	constructor(book: Book) {
		super();
		this.name = book.name;
		this.description = book.description;
		this.author = book.author;
		this.image = book.image;

		if (book.createdAt) {
			this.createdAt = book.createdAt;
		} else {
			this.beforeInsert();
		}

		if (book.id) {
			this.id = book.id;
		} else {
			this.generateId();
		}
	}

	public update<T>(data: Partial<T>): T {
		return super.update<T>(data);
	}

	public toPlainObject<T>(): T {
		const baseObject = super.toPlainObject<T>();
		return {
			...baseObject,
			name: this.name,
			description: this.description,
			author: this.author,
			image: this.image,
		};
	}
}

export { BookModel };
