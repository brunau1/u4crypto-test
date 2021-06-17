import * as Hapi from '@hapi/hapi';
import * as CustomerValidation from '../validations/customer.validator';
import CustomerController from '../controllers/customer.controller';

export default function (server: Hapi.Server) {
	const controller = new CustomerController();
	server.bind(controller);
	server.route({
		method: 'POST',
		path: '/customer',
		options: {
			handler: controller.createCustomer,
			auth: false,
			validate: {
				payload: CustomerValidation.createUserModel,
			},
			description: 'Create a customer and generate the access token.',
		},
	});
}
