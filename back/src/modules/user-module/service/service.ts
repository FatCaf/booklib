import { DataBase, Queries, HttpStatus } from '@enums/enums';
import { SearchParams } from '@app-types/types';
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
		const user = await this.search({ email: data.email });

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
		const isUserInvalid = validate<Partial<User>>(userSchema.create, data);

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

	public async search(data: SearchParams): Promise<User> {
		const searchValue = data.id ?? data.email;

		if (!searchValue)
			throw new HttpError(
				HttpStatus.BAD_REQUEST,
				"Provide an 'id' or 'email' to search"
			);

		const field = queryService.createFieldsWithSequence<SearchParams>(data);
		const query = queryService.generateQuery(Queries.SEARCH, {
			table: DataBase.USERS,
			field,
		});

		const user = await this.repository.search(searchValue, query);

		if (!user) throw new HttpError(HttpStatus.NOT_FOUND, 'User not found');

		return user;
	}

	public async edit(data: Partial<User>, id: string): Promise<User> {
		const isUserInvalid = validate<Partial<User>>(userSchema.edit, data);

		if (isUserInvalid)
			throw new HttpError(HttpStatus.BAD_REQUEST, isUserInvalid);

		await this.search({ id });

		const fields = queryService.createFieldsWithSequence({
			id,
			...data,
		});

		const query = queryService.generateQuery(Queries.EDIT, {
			table: DataBase.USERS,
			fields,
		});

		const user = await this.repository.edit({ id, ...data }, query);

		if (!user)
			throw new HttpError(
				HttpStatus.INTERNAL_SERVER_ERROR,
				'Cannot update book'
			);

		return user;
	}
}

export { UserService };
