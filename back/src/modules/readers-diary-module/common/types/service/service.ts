import type { SearchParams } from '@app-types/types';
import type { BorrowBook } from '../types';

export interface Service {
	edit(data: Partial<BorrowBook>): Promise<BorrowBook>;
	search(params: SearchParams): Promise<BorrowBook>;
	borrowBook(data: Partial<BorrowBook>): Promise<BorrowBook>;
}
