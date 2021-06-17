import { getConnection } from 'typeorm';
import Customer from '../models/customer.model';
import Crypto from '../utils/crypto';

export default class AuthService {
	static async verifyCustomerLogin(email: string, password: string) {
		const connection = getConnection();
		const repository = connection.getRepository(Customer);
		const customer = await repository.findOne({ email: email });
		if (!customer) throw { message: 'Customer not found.' };
		if (Crypto.decrypt(customer.password) != password)
			throw { message: 'Password is invalid.' };
		return customer.id;
	}
}
