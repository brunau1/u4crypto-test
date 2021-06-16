import * as Hapi from '@hapi/hapi';
import CustomerController from '../handlers/customer.controller';

export default function (server: Hapi.Server) {
	const controller = new CustomerController();
	server.bind(controller);
	server.route({
		method: 'POST',
		path: '/customer',
		options: {
			handler: controller.createCustomer,
			auth: false,
			tags: ['api', 'customer'],
			description: 'Create a customer.',
		},
	});
}
