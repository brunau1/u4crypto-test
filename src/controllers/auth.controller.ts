import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import { getConnection } from 'typeorm';
import { ILoginRequest } from '../interfaces/auth.interface';
import JWT from '../utils/jwt';
import Customer from '../models/customer.model';
import AuthService from '../services/auth.service';

export default class AuthController {
	public async login(request: ILoginRequest, h: Hapi.ResponseToolkit) {
		try {
			const { email, password } = request.payload;
			const customerInfo = await AuthService.verifyCustomerLogin(
				email,
				password
			);
			return h.response({ token: JWT.generateToken(customerInfo) }).code(200);
		} catch (error) {
			return Boom.unauthorized(error.message);
		}
	}
	static async validateUser(
		decoded: any,
		request: Hapi.Request,
		h: Hapi.ResponseToolkit
	) {
		const connection = getConnection();
		const repository = connection.getRepository(Customer);
		const customer = await repository.findOne(decoded['id']);
		if (!customer) return { isValid: false };
		return { isValid: true };
	}
}
