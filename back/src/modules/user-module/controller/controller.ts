import type { Request, RequestHandler, Response } from "express";
import { HttpStatus } from "../../../common/enums/http-status/http-status";
import { HttpError } from "../../../helpers/http-error/http-error";
import type { UserService } from "../service/service";
import type { Controller } from "../types/controller/controller";

class UserController implements Controller {
	private service: UserService;

	constructor(service: UserService) {
		this.service = service;
	}
	public login: RequestHandler = async (
		req: Request,
		res: Response,
	): Promise<void> => {
		try {
			const user = await this.service.login(req.body);

			res.status(HttpStatus.OK).json({ success: true, user });
		} catch (error) {
			if (error instanceof HttpError) {
				res.status(error.statusCode).json({ message: error.message });
			} else {
				res
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.json({ message: "Unexpected error while trying to login" });
			}
		}
	};
	public register: RequestHandler = async (
		req: Request,
		res: Response,
	): Promise<void> => {
		try {
			const user = await this.service.register(req.body);

			res.status(HttpStatus.CREATED).json({ success: true, user });
		} catch (error) {
			if (error instanceof HttpError) {
				res.status(error.statusCode).json({ message: error.message });
			} else {
				res
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.json({ message: "Unexpected error while trying to crate a user" });
			}
		}
	};
}

export { UserController };
