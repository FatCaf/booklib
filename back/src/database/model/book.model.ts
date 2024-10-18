import { AbstractModel } from './model';

class BookModel extends AbstractModel {
	public name!: string;

	public description!: string;

	public author!: string;

	public image!: string;
}

export { BookModel };
