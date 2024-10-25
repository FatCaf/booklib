import type { Request, RequestHandler, Response } from "express";
import { HttpStatus } from "../../../common/enums/http-status/http-status";
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
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
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
			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error });
		}
	};
}

export { UserController };
