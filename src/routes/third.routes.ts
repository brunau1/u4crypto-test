import * as Hapi from '@hapi/hapi';
import * as AuthValidation from '../validations/auth.validator';
import * as ThirdValidation from '../validations/third.validator';
import ThirdController from '../controllers/third.controller';

export default function (server: Hapi.Server) {
	const controller = new ThirdController();
	server.bind(controller);
	server.route({
		method: 'POST',
		path: '/third',
		options: {
			handler: controller.create,
			auth: 'jwt',
			validate: {
				payload: ThirdValidation.createThirdModel,
			},
			description: 'Create a third.',
		},
	});

	server.route({
		method: 'GET',
		path: '/third/{cpf}',
		options: {
			handler: controller.find,
			auth: 'jwt',
			validate: {
				headers: AuthValidation.jwtValidator,
			},
			description: 'find a third by id',
		},
	});

	server.route({
		method: 'GET',
		path: '/third/all',
		options: {
			handler: controller.findAll,
			auth: 'jwt',
			validate: {
				headers: AuthValidation.jwtValidator,
			},
			description: 'Get all third',
		},
	});

	server.route({
		method: 'PUT',
		path: '/third',
		options: {
			handler: controller.update,
			auth: 'jwt',
			validate: {
				headers: AuthValidation.jwtValidator,
				payload: ThirdValidation.updateThirdModel,
			},
			description: 'Update a third.',
		},
	});

	server.route({
		method: 'DELETE',
		path: '/third',
		options: {
			handler: controller.delete,
			auth: 'jwt',
			validate: {
				headers: AuthValidation.jwtValidator,
				payload: ThirdValidation.deleteThirdModel,
			},
			description: 'Delete a third.',
		},
	});
}
