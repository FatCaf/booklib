import * as crypto from "node:crypto";

export default function hashPassword(password: string): Promise<string> {
	const salt = crypto.randomBytes(16).toString("hex");
	return new Promise((resolve, reject) => {
		crypto.scrypt(password, salt, 64, (err, derivedKey) => {
			if (err) reject(err);
			resolve(`${salt}:${derivedKey.toString("hex")}`);
		});
	});
}
