import type { BorrowBook } from '../borrow-book/borrow-book';

export interface User {
	id: string;
	name: string;
	email: string;
	role: string;
	password: string;
	createdAt: string;
	updatedAt: string;
	borrowedBooks: BorrowBook[];
}
