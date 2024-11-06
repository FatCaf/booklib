import { BorrowBook } from '../types';

export interface ReadersDiary {
	user_id: string;
	borrowed_books: BorrowBook[];
}
