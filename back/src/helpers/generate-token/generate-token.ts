import jwt, { type Secret } from 'jsonwebtoken';
import { JWT_EXPIRATION, JWT_SECRET } from '../get-envs/get-envs';

export function generateToken(id: string, role: string) {
	return jwt.sign({ id, role }, JWT_SECRET as Secret, {
		expiresIn: `${JWT_EXPIRATION}d`,
	});
}
