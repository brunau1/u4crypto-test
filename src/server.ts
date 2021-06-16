import * as Hapi from '@hapi/hapi';
import JWT from './utils/jwt';
import * as DB from './database/postgre';

const server = new Hapi.Server({ port: 3000 });
JWT.register(server);
