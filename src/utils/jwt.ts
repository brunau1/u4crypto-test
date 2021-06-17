import * as Jwt from 'jsonwebtoken';
import * as Hapi from '@hapi/hapi';
import AuthController from '../controllers/auth.controller';

interface JWTInfo {
	id: string;
	role: string;
}
export default class JWT {
	static generateToken(customerInfo: JWTInfo) {
		const { JWT_SECRET, JWT_EXPIRATION } = process.env;
		return Jwt.sign(
			{ id: customerInfo.id, role: customerInfo.role },
			JWT_SECRET,
			{
				algorithm: 'HS256',
				expiresIn: JWT_EXPIRATION,
			}
		);
	}
	static decode(token: string) {
		try {
			const verified = Jwt.decode(token);
			return verified;
		} catch (error) {
			throw { message: 'Invalid jwt token' };
		}
	}

	static async register(server: Hapi.Server) {
		try {
			await server.register(require('hapi-auth-jwt2'));
			return this.setAuthStrategy(server, AuthController.validateUser);
		} catch (err) {
			console.log(`Error registering jwt plugin: ${err}`);
			throw err;
		}
	}

	private static async setAuthStrategy(server, validate) {
		const { JWT_SECRET } = process.env;
		server.auth.strategy('jwt', 'jwt', {
			key: JWT_SECRET,
			validate,
			verifyOptions: {
				algorithms: ['HS256'],
			},
		});
		server.auth.default('jwt');
		return;
	}
}
