require('dotenv-safe').config();

// import Customer from './models/customer.model';
// import { v4 as uuid } from 'uuid';
import 'reflect-metadata';
import * as Hapi from '@hapi/hapi';
import * as DB from './database/postgre';
import AuthRoutes from './routes/auth.routes';
import CustomerRoutes from './routes/customer.routes';
import JWT from './utils/jwt';

const test = JWT.generateToken('brunoelindodemaisdaconta');
const res = JWT.verify(test);
console.log(res);

export async function init(server: Hapi.Server) {
	CustomerRoutes(server);
	AuthRoutes(server);
}

// import { getConnection } from 'typeorm';
// import Crypto from './utils/crypto';

// async function test() {
// 	const conn = getConnection();
// 	const repo = conn.getRepository(Customer);
// 	const user = new Customer();
// 	user.id = uuid().toString();
// 	user.name = 'bruno';
// 	user.email = 'brunosantosprotec@gmail.com';
// 	user.birthday = new Date('07-05-2001').toISOString();
// 	user.cpf = '12714193609';
// 	user.password = Crypto.encrypt('153629847');
// 	await repo.save(user);
// }

// test().then();
