import type { Book } from '../../../common/types/book/book';
import { AbstractModel } from '../../../database/model/model';

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
		this.beforeInsert();
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
