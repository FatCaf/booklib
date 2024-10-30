import { DataBase } from '../../../common/enums/database/database';
import { HttpStatus } from '../../../common/enums/http-status/http-status';
import { Queries } from '../../../common/enums/queries/queries';
import type { SearchParams } from '../../../common/types/search-params/search-params';
import generateToken from '../../../helpers/generate-token/generate-token';
import hashPassword from '../../../helpers/hash-password/hash-password';
import { HttpError } from '../../../helpers/http-error/http-error';
import validate from '../../../helpers/joi-validate/validate';
import verifyPassword from '../../../helpers/verify-password/verify-password';
import queryService from '../../../service/query-service/query.service';
import userSchema from '../joi-schema/user';
import { UserModel } from '../model/model';
import type { UserRepository } from '../repository/repository';
import type { BorrowBook } from '../types/borrow-book/borrow-book';
import type { Service } from '../types/service/service';
import type { User } from '../types/user/user';

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

	public async register(data: User): Promise<User> {
		const isUserInvalid = validate<User>(userSchema.create, data);

		if (isUserInvalid)
			throw new HttpError(HttpStatus.BAD_REQUEST, isUserInvalid);

		const newUser = new UserModel(data).toPlainObject<User>();

		const hashedPassword = await hashPassword(newUser.password);

		const [fields, sequence] =
			queryService.createFieldsAndSequence<User>(newUser);
		const query = queryService.generateQuery(Queries.CREATE, {
			table: DataBase.USERS,
			fields,
			sequence,
		});

		const user = await this.repository.create(
			{
				...newUser,
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

		const oldUser = await this.search({ id });

		const editedUser = new UserModel(oldUser).update<User>(data);

		const fields = queryService.createFieldsWithSequence({
			...data,
			updatedAt: editedUser.updatedAt,
			id,
		});

		const query = queryService.generateQuery(Queries.EDIT, {
			table: DataBase.USERS,
			fields,
		});

		const user = await this.repository.edit(data, query);

		if (!user)
			throw new HttpError(
				HttpStatus.INTERNAL_SERVER_ERROR,
				'Cannot update book'
			);

		return user;
	}

	public async borrowBook(data: BorrowBook, id: string): Promise<void> {
		const user = await this.search({ id });

		const updatedUser = await this.edit({ borrowedBooks: data }, id);
	}
}

export { UserService };
