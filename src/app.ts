import * as Hapi from '@hapi/hapi';
import AuthRoutes from './routes/auth.routes';
import CustomerRoutes from './routes/customer.routes';
import ThirdRoutes from './routes/third.routes';

export function init(server: Hapi.Server) {
	AuthRoutes(server);
	ThirdRoutes(server);
	CustomerRoutes(server);
}
