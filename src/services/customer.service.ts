import { getConnection } from 'typeorm';
import { ICreateCustomer } from '../interfaces/customer.interface';
import { v4 as uuid } from 'uuid';
import Customer from '../models/customer.model';
import Crypto from '../utils/crypto';

export default class CustomerService {
	static async verifyExistingCustomer(email) {
		const connection = getConnection();
		const repository = connection.getRepository(Customer);
		if (await repository.findOne({ email: email }))
			throw { message: 'Customer email already registered' };
	}
	static async saveCustomerData(request: ICreateCustomer) {
		try {
			const { name, cpf, email, birthday } = request.payload;
			const connection = getConnection();
			const repository = connection.getRepository(Customer);
			const password = Crypto.encrypt(request.payload.password);
			const customer = new Customer();
			customer.id = uuid().toString();
			customer.cpf = cpf;
			customer.name = name;
			customer.email = email;
			customer.birthday = new Date(birthday).toISOString();
			customer.password = password;
			await repository.save(customer);
			return customer.id;
		} catch (error) {
			throw { message: 'Failed to save customer' };
		}
	}
}
