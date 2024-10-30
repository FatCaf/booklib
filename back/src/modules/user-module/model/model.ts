import { AbstractModel } from '../../../common/abstractions/model/model';
import type { BorrowBook } from '../types/borrow-book/borrow-book';
import type { User } from '../types/user/user';

class UserModel extends AbstractModel {
	public name!: string;

	public email!: string;

	public role!: string;

	public password!: string;

	public borrowedBooks!: BorrowBook[];

	constructor(user: User) {
		super();
		this.name = user.name;
		this.email = user.email;
		this.role = user.role || 'user';
		this.password = user.password;
		this.borrowedBooks = user.borrowedBooks || [];

		if (user.createdAt) {
			this.createdAt = user.createdAt;
		} else {
			this.beforeInsert();
		}

		if (user.id) {
			this.id = user.id;
		} else {
			this.generateId();
		}
	}

	public update<T>(data: Partial<T>): T {
		return super.update(data);
	}

	public toPlainObject<T>(): T {
		const baseObject = super.toPlainObject<T>();
		return {
			...baseObject,
			name: this.name,
			email: this.email,
			role: this.role,
			password: this.password,
		};
	}
}

export { UserModel };
