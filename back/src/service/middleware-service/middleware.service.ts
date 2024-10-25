import type { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../common/enums/http-status/http-status";

class MiddlewareService {
	public async responseMiddleware(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		switch (res.statusCode) {
			case HttpStatus.OK:
				res.status(HttpStatus.OK).json(res.locals.data);
				break;
			case HttpStatus.CREATED:
				res.status(HttpStatus.CREATED).json(res.locals.data);
				break;
			case HttpStatus.BAD_REQUEST:
				res
					.status(HttpStatus.BAD_REQUEST)
					.json({ message: res.locals.message });
				break;
			case HttpStatus.INTERNAL_SERVER_ERROR:
				res
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.json({ message: res.locals.message });
				break;
			case HttpStatus.UNAUTHORIZED:
				res
					.status(HttpStatus.UNAUTHORIZED)
					.json({ message: res.locals.message });
				break;
			case HttpStatus.NOT_FOUND:
				res.status(HttpStatus.NOT_FOUND).json({ message: res.locals.message });
				break;
			default:
				res
					.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.json({ message: res.locals.message });
				break;
		}

		next();
	}

	public async permissionMiddleware(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const authHeader = req.headers.authorization || "";
		if (!authHeader || !authHeader.startsWith("Basic ")) {
			res.status(HttpStatus.UNAUTHORIZED).json({ message: "Unauthorized" });
		}

		const base64Credentials = authHeader.split(" ")[1];
		const credentials = Buffer.from(base64Credentials, "base64").toString(
			"utf-8",
		);
		const [username, password] = credentials.split(":");

		if (username === "admin" && password === "admin") {
			next();
		} else {
			res.status(HttpStatus.UNAUTHORIZED).json({ message: "Unauthorized" });
		}
	}
}

export default new MiddlewareService();
