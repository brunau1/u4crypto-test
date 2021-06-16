import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import * as TypeORM from 'typeorm';
import { getConnection } from 'typeorm';
import { ILoginRequest } from '../interfaces/auth.interface';
import JWT from '../utils/jwt';
import Customer from '../models/customer.model';
import Crypto from '../utils/crypto';
import { validateRequest } from '../validations/util.validate';

export default class AuthController {
	private connection: TypeORM.Connection;

	constructor() {
		this.connection = TypeORM.getConnection();
	}
	public async login(request: ILoginRequest, h: Hapi.ResponseToolkit) {
		validateRequest(request.payload);
		const { email, password } = request.payload;
		const connection = getConnection();
		const repository = connection.getRepository(Customer);
		const customer = await repository.findOne({ email: email });

		if (Crypto.decrypt(customer.password) != password)
			return Boom.unauthorized('Password is invalid.');

		return h.response({ token: JWT.generateToken(customer.id) }).code(200);
	}
}
