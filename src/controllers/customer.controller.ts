import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import { v4 as uuid } from 'uuid';
import { getConnection } from 'typeorm';
import { ICreateCustomer } from '../interfaces/customer.interface';
import Customer from '../models/customer.model';
import Crypto from '../utils/crypto';
import JWT from '../utils/jwt';
import { validateRequest } from '../validations/util.validate';

export default class CustomerController {
	public async createCustomer(
		request: ICreateCustomer,
		h: Hapi.ResponseToolkit
	) {
		try {
			validateRequest(request.payload);
			const { name, cpf, email, birthday } = request.payload;
			const password = Crypto.encrypt(request.payload.password);
			const connection = getConnection();
			const repository = connection.getRepository(Customer);
			const customer = new Customer();
			customer.id = uuid().toString();
			customer.name = name;
			customer.cpf = cpf;
			customer.email = email;
			customer.birthday = new Date(birthday).toISOString();
			customer.password = password;
			repository.save(customer);
			return h
				.response({
					message: 'Created',
					token: JWT.generateToken(customer.id),
				})
				.code(201);
		} catch (error) {
			return Boom.badRequest(error.message);
		}
	}
}
