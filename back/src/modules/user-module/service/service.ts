import { DataBase, Queries, HttpStatus } from '@enums/enums';
import {
	generateToken,
	hashPassword,
	HttpError,
	validate,
	verifyPassword,
} from '@helpers/helpers';
import queryService from '@services/query-service/query.service';
import userSchema from '@user/joi/user';
import type { UserRepository } from '@user/repository/repository';
import type { Service, User } from '@user/types/types';

class UserService implements Service {
	private repository: UserRepository;

	constructor(repository: UserRepository) {
		this.repository = repository;
	}

	public async login(
		data: Pick<User, 'password' | 'email'>
	): Promise<{ user: User; token: string }> {
		const field = queryService.createFieldsWithSequence<{ email: string }>({
			email: data.email,
		});
		const query1 = queryService.generateQuery(Queries.SEARCH, {
			table: DataBase.USERS,
			field,
		});
		const user = await this.repository.search(data.email, query1);

		if (await verifyPassword(data.password, user.password)) {
			const token = generateToken(user.id, user.role);

			return {
				user,
				token,
			};
		}

		throw new HttpError(HttpStatus.UNAUTHORIZED, 'Invalid login or password');
	}
	public async register(data: Partial<User>): Promise<User> {
		const isUserInvalid = validate<Partial<User>>(userSchema, data);

		if (isUserInvalid)
			throw new HttpError(HttpStatus.BAD_REQUEST, isUserInvalid);

		const hashedPassword = await hashPassword(data?.password);

		data.role = data.role ? data.role : 'user';

		const [fields, sequence] = queryService.createFieldsAndSequence(data);
		const query = queryService.generateQuery(Queries.CREATE, {
			table: DataBase.USERS,
			fields,
			sequence,
		});

		const user = await this.repository.create(
			{
				...data,
				password: hashedPassword,
			},
			query
		);

		if (!user)
			throw new HttpError(HttpStatus.BAD_REQUEST, 'Cannot create user');
		return user;
	}
}

export { UserService };
