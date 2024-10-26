import * as crypto from "node:crypto";

export default async function verifyPassword(
	password: string,
	hashedPassword: string,
): Promise<boolean> {
	const [salt, key] = hashedPassword.split(":");
	return new Promise((resolve, reject) => {
		crypto.scrypt(password, salt, 64, (err, derivedKey) => {
			if (err) reject(err);
			resolve(key === derivedKey.toString("hex"));
		});
	});
}
