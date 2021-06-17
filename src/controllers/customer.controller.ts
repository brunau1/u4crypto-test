import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import {
	ICreateCustomer,
	IUpdateCustomer,
} from '../interfaces/customer.interface';
import CustomerService from '../services/customer.service';
import JWT from '../utils/jwt';
import AuthService from '../services/auth.service';

export default class CustomerController {
	public async findCustomers(request: Hapi.Request, h: Hapi.ResponseToolkit) {
		try {
			const authorized = AuthService.verifyRoleAuthorization(
				request.headers.authorization,
				'admin'
			);
			if (!authorized)
				return Boom.unauthorized('Unauthorized role for this request');
			const customers = await CustomerService.findAllCustomers();
			return h
				.response({
					data: customers,
				})
				.code(201);
		} catch (error) {
			return Boom.notFound(error.message);
		}
	}
	public async createCustomer(
		request: ICreateCustomer,
		h: Hapi.ResponseToolkit
	) {
		try {
			const { email } = request.payload;
			await CustomerService.verifyExistingCustomer(email);
			const customerInfo = await CustomerService.saveCustomer(request);
			return h
				.response({
					message: 'Created',
					token: JWT.generateToken(customerInfo),
				})
				.code(201);
		} catch (error) {
			return Boom.badRequest(error.message);
		}
	}

	public async updateCustomer(
		request: IUpdateCustomer,
		h: Hapi.ResponseToolkit
	) {
		try {
			const authorized = AuthService.verifyUserIdentity(
				request.headers.authorization,
				request.payload.id
			);
			if (!authorized)
				return Boom.unauthorized('Customers can update only your own data');
			await CustomerService.updateCustomer(request);
			return h
				.response({
					message: 'Updated',
				})
				.code(201);
		} catch (error) {
			return Boom.notFound(error.message);
		}
	}
}
