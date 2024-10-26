import type { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../common/enums/http-status/http-status";

class MiddlewareService {
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
