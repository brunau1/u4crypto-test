import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import {
	ICreateCustomer,
	IDeleteCustomer,
	IUpdateCustomer,
} from '../interfaces/customer.interface';
import CustomerService from '../services/customer.service';
import JWT from '../utils/jwt';
import AuthService from '../services/auth.service';

export default class CustomerController {
	public async find(request: Hapi.Request, h: Hapi.ResponseToolkit) {
		const customer = await CustomerService.findCustomerById(
			request.headers.authorization
		);
		if (!customer) return Boom.notFound('Customer not found');
		return h
			.response({
				message: 'Found',
				data: customer,
			})
			.code(200);
	}
	public async findAll(request: Hapi.Request, h: Hapi.ResponseToolkit) {
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
					message: 'Found',
					data: customers,
				})
				.code(200);
		} catch (error) {
			return Boom.notFound(error.message);
		}
	}
	public async create(request: ICreateCustomer, h: Hapi.ResponseToolkit) {
		try {
			const { email, cpf } = request.payload;
			await CustomerService.verifyExistingCustomer(cpf, email);
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
	public async update(request: IUpdateCustomer, h: Hapi.ResponseToolkit) {
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
				.code(200);
		} catch (error) {
			return Boom.internal(error.message);
		}
	}
	public async delete(request: IDeleteCustomer, h: Hapi.ResponseToolkit) {
		try {
			const { id } = request.payload;
			const authorized = AuthService.verifyUserIdentity(
				request.headers.authorization,
				id
			);
			if (!authorized)
				return Boom.unauthorized('Customers can delete only your own data');
			await CustomerService.deleteCustomer(id);
			return h
				.response({
					message: 'Deleted',
				})
				.code(200);
		} catch (error) {
			return Boom.notFound(error.message);
		}
	}
}
