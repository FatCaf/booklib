import type { BorrowBook } from '@user/types/types';

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
