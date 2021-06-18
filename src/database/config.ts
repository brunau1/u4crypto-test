import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import Appointment from '../models/accident.model';
import Customer from '../models/customer.model';
import Third from '../models/third.model';

const typeOrmConfig: PostgresConnectionOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'admin',
	database: 'test_u4crypto',
	synchronize: true,
	logging: false,
	entities: [Appointment, Customer, Third],
};

export default typeOrmConfig;
