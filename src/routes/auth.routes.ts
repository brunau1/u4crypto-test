import * as Hapi from '@hapi/hapi';
import AuthController from '../handlers/auth.controller';

export default function (server: Hapi.Server) {
	const controller = new AuthController();
	server.bind(controller);
	server.route({
		method: 'POST',
		path: '/login',
		options: {
			handler: controller.login,
			auth: 'jwt',
			tags: ['api', 'users'],
			description: 'Get user info.',
		},
	});
}
