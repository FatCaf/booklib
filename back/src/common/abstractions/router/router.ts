import type { Router as ExpressRouter } from "express";
import type { Router } from "../../types/router/router";

class AbstractRouter implements Router {
	initRoutes(): void {
		throw new Error("Method not implemented.");
	}
	getRouter(): ExpressRouter {
		throw new Error("Method not implemented.");
	}
}

export { AbstractRouter };
