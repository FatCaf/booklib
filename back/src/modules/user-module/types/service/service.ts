import type { SearchParams } from '../../../../common/types/search-params/search-params';
import type { BorrowBook } from '../borrow-book/borrow-book';
import type { User } from '../user/user';

export interface Service {
	login(
		data: Pick<User, 'password' | 'email'>
	): Promise<{ user: User; token: string }>;
	register(data: User): Promise<User>;
	borrowBook(data: BorrowBook, id: string): Promise<void>;
	search(data: SearchParams): Promise<User>;
	edit(data: Partial<User>, id: string): Promise<User>;
}
