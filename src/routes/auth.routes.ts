import * as Hapi from '@hapi/hapi';
import * as AuthValidation from '../validations/auth.validator';
import AuthController from '../controllers/auth.controller';

export default function (server: Hapi.Server) {
	const controller = new AuthController();
	server.bind(controller);
	server.route({
		method: 'POST',
		path: '/login',
		options: {
			handler: controller.login,
			auth: false,
			validate: {
				payload: AuthValidation.loginUserModel,
			},
			description: 'Authenticate the user',
		},
	});
}
