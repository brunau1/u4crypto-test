require('dotenv-safe').config();

import 'reflect-metadata';
import * as Hapi from '@hapi/hapi';
import JWT from './utils/jwt';
import * as DB from './database/postgre';
import * as App from './app';

async function start() {
	try {
		await DB.connect();
		const server = new Hapi.Server({
			port: process.env.PORT,
			routes: {
				cors: {
					origin: ['*'],
				},
			},
		});
		await JWT.register(server);
		App.init(server);
		await server.start();
		console.log(`Running environment: ${process.env.NODE_ENV || 'dev'}`);
		console.log('Server running at:', server.info.uri);
	} catch (error) {
		console.log(error.message);
	}
}

start();
