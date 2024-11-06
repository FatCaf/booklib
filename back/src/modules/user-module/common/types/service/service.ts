import type { SearchParams } from '@app-types/types';
import type { User } from '@user/types/types';
export interface Service {
	login(
		data: Pick<User, 'password' | 'email'>
	): Promise<{ user: User; token: string }>;
	register(data: User): Promise<User>;
	search(data: SearchParams): Promise<User>;
	edit(data: Partial<User>, id: string): Promise<User>;
}
