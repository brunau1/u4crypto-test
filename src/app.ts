import * as Hapi from '@hapi/hapi';
import AuthRoutes from './routes/auth.routes';
import CustomerRoutes from './routes/customer.routes';

export function init(server: Hapi.Server) {
	CustomerRoutes(server);
	AuthRoutes(server);
}
