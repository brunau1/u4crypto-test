import * as Hapi from '@hapi/hapi';
import * as AuthValidation from '../validations/auth.validator';
import * as CustomerValidation from '../validations/customer.validator';
import CustomerController from '../controllers/customer.controller';

export default function (server: Hapi.Server) {
	const controller = new CustomerController();
	server.bind(controller);
	server.route({
		method: 'POST',
		path: '/customer',
		options: {
			handler: controller.create,
			auth: false,
			validate: {
				payload: CustomerValidation.createCustomerModel,
			},
			description: 'Create a customer and generate the access token.',
		},
	});

	server.route({
		method: 'GET',
		path: '/customer',
		options: {
			handler: controller.find,
			auth: 'jwt',
			validate: {
				headers: AuthValidation.jwtValidator,
			},
			description: 'Get all customers',
		},
	});

	server.route({
		method: 'PUT',
		path: '/customer',
		options: {
			handler: controller.update,
			auth: 'jwt',
			validate: {
				headers: AuthValidation.jwtValidator,
				payload: CustomerValidation.updateCustomerModel,
			},
			description: 'Update a customer.',
		},
	});

	server.route({
		method: 'DELETE',
		path: '/customer',
		options: {
			handler: controller.delete,
			auth: 'jwt',
			validate: {
				headers: AuthValidation.jwtValidator,
				payload: CustomerValidation.deleteCustomerModel,
			},
			description: 'Delete a customer.',
		},
	});
}
