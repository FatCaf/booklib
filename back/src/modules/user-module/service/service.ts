import { DataBase } from "../../../common/enums/database/database";
import { HttpStatus } from "../../../common/enums/http-status/http-status";
import { Queries } from "../../../common/enums/queries/queries";
import { HttpError } from "../../../helpers/http-error/http-error";
import validate from "../../../helpers/joi-validate/validate";
import queryService from "../../../service/query-service/query.service";
import userSchema from "../joi-schema/user";
import { UserModel } from "../model/model";
import type { UserRepository } from "../repository/repository";
import type { Service } from "../types/service/service";
import type { User } from "../types/user/user";

class UserService implements Service {
	private repository: UserRepository;

	constructor(repository: UserRepository) {
		this.repository = repository;
	}

	public async login(data: Pick<User, "password" | "email">): Promise<User> {
		const field = queryService.createFieldsWithSequence<{ email: string }>({
			email: data.email,
		});
		const query1 = queryService.generateQuery(Queries.SEARCH, {
			table: DataBase.USERS,
			field,
		});
		const user = await this.repository.search(data.email, query1);

		if (user.password === data.password) return user;

		throw new HttpError(HttpStatus.UNAUTHORIZED, "Invalid login or password");
	}
	public async register(data: User): Promise<User> {
		const isUserInvalid = validate<User>(userSchema, data);

		if (isUserInvalid)
			throw new HttpError(HttpStatus.BAD_REQUEST, isUserInvalid);

		const newUser = new UserModel(data).toPlainObject<User>();
		const [fields, sequence] =
			queryService.createFieldsAndSequence<User>(newUser);
		const query = queryService.generateQuery(Queries.CREATE, {
			table: DataBase.USERS,
			fields,
			sequence,
		});

		const user = await this.repository.create(newUser, query);
		if (!user)
			throw new HttpError(HttpStatus.BAD_REQUEST, "Cannot create user");
		return user;
	}
}

export { UserService };
