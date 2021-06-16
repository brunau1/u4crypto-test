import * as Jwt from 'jsonwebtoken';

export default class JWT {
	static generateToken(id: string) {
		const { JWT_SECRET, JWT_EXPIRATION } = process.env;
		return Jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
	}
	static verify(token: string) {
		try {
			const { JWT_SECRET } = process.env;
			const verified = Jwt.verify(token, JWT_SECRET);
			return verified;
		} catch (error) {
			throw { message: 'Invalid jwt token' };
		}
	}
}
