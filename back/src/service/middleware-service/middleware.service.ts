import type { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpStatus } from "../../common/enums/http-status/http-status";
import { JWT_SECRET } from "../../helpers/get-envs/get-envs";

class MiddlewareService {
	public permissionMiddleware(): RequestHandler {
		return async (req: Request, res: Response, next: NextFunction) => {
			const token = req.headers.authorization?.replace("Bearer ", "");

			if (!token) {
				res.status(HttpStatus.FORBIDDEN).json({ message: "Unauthorized" });
				return;
			}

			if (!JWT_SECRET) {
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					message: "Unable to process request, jwt secret is undefined",
				});
				return;
			}

			const decoded = jwt.verify(token, JWT_SECRET);
			console.log(decoded);
			next();
		};
	}
}

export default new MiddlewareService();
