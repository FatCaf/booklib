import type { User } from "../user/user";

export interface Service {
	login(
		data: Pick<User, "password" | "email">,
	): Promise<{ user: User; token: string }>;
	register(data: User): Promise<User>;
}
