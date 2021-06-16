import * as Jwt from 'jsonwebtoken';
import * as Hapi from '@hapi/hapi';
import { getConnection } from 'typeorm';
import Customer from '../models/customer.model';
export default class JWT {
	static generateToken(id: string) {
		const { JWT_SECRET, JWT_EXPIRATION } = process.env;
		return Jwt.sign({ id }, JWT_SECRET, {
			algorithm: 'HS256',
			expiresIn: JWT_EXPIRATION,
		});
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

	static async register(server: Hapi.Server) {
		try {
			const connection = getConnection();
			const repository = connection.getRepository(Customer);
			const validateUser = async (
				decoded: any,
				request: Hapi.Request,
				h: Hapi.ResponseToolkit
			) => {
				const customer = await repository.findOne(decoded.id);
				if (!customer) return { isValid: false };
				return { isValid: true };
			};

			await server.register(require('hapi-auth-jwt2'));

			return this.setAuthStrategy(server, validateUser);
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
