import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import { ICreateCustomer } from '../interfaces/customer.interface';
import CustomerService from '../services/customer.service';
import JWT from '../utils/jwt';

export default class CustomerController {
	public async createCustomer(
		request: ICreateCustomer,
		h: Hapi.ResponseToolkit
	) {
		try {
			const { email } = request.payload;
			await CustomerService.verifyExistingCustomer(email);
			const id = await CustomerService.saveCustomerData(request);
			return h
				.response({
					message: 'Created',
					token: JWT.generateToken(id),
				})
				.code(201);
		} catch (error) {
			return Boom.badRequest(error.message);
		}
	}
}
