import type { Request, RequestHandler, Response } from 'express';
import { HttpStatus } from '@enums/enums';
import type { UserService } from '@user/service/service';
import type { Controller } from '@user/types/controller/controller';
import { handleError } from '@helpers/helpers';

class UserController implements Controller {
	private service: UserService;

	constructor(service: UserService) {
		this.service = service;
	}

	public login: RequestHandler = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const user = await this.service.login(req.body);

			res.status(HttpStatus.OK).json({ success: true, user });
		} catch (error) {
			handleError(error, res);
		}
	};

	public register: RequestHandler = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const user = await this.service.register(req.body);

			res.status(HttpStatus.CREATED).json({ success: true, user });
		} catch (error) {
			handleError(error, res);
		}
	};

	public borrowBook: RequestHandler = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const { data, id } = req.body;
			await this.service.borrowBook(data, id);
		} catch (error) {
			handleError(error, res);
		}
	};
}

export { UserController };
