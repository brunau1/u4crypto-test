import { getConnection } from 'typeorm';
import Accident from '../models/accident.model';
import Customer from '../models/customer.model';
import Third from '../models/third.model';
import JWT from '../utils/jwt';

export default class AccidentService {
	static async findAccidentByCustomerId(authorization) {
		const decoded = JWT.decode(authorization);
		const connection = getConnection();
		const repository = connection.getRepository(Accident);
		return await repository.find({ customer: decoded['id'] });
	}
	//TODO
	static async findAccidentWhereCustomerIsThird(authorization) {
		const decoded = JWT.decode(authorization);
		const connection = getConnection();
		const repository = connection.getRepository(Accident);
	}
}
