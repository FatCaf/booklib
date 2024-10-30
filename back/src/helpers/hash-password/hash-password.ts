import * as crypto from 'node:crypto';

export function hashPassword(password: string | undefined): Promise<string> {
	if (!password) throw new Error('No password provided');

	const salt = crypto.randomBytes(16).toString('hex');
	return new Promise((resolve, reject) => {
		crypto.scrypt(password, salt, 64, (err, derivedKey) => {
			if (err) reject(err);
			resolve(`${salt}:${derivedKey.toString('hex')}`);
		});
	});
}
