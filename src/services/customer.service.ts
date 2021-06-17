import { getConnection } from 'typeorm';
import {
	ICreateCustomer,
	IUpdateCustomer,
} from '../interfaces/customer.interface';
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

	static async findAllCustomers() {
		const connection = getConnection();
		const repository = connection.getRepository(Customer);
		return await repository.find();
	}
	static async saveCustomer(request: ICreateCustomer) {
		try {
			const { role, name, cpf, email, birthday } = request.payload;
			const connection = getConnection();
			const repository = connection.getRepository(Customer);
			const password = Crypto.encrypt(request.payload.password);
			const customer = new Customer();
			customer.id = uuid().toString();
			customer.cpf = cpf;
			customer.role = role;
			customer.name = name;
			customer.email = email;
			customer.birthday = new Date(birthday).toISOString();
			customer.password = password;
			await repository.save(customer);
			return { id: customer.id, role: customer.role };
		} catch (error) {
			throw { message: 'Failed to save customer' };
		}
	}

	static async updateCustomer(request: IUpdateCustomer) {
		try {
			const { id, name, cpf, birthday } = request.payload;
			const connection = getConnection();
			const repository = connection.getRepository(Customer);
			const customer: Customer = await repository.findOne(id);
			if (!customer) throw { message: 'Customer not found' };
			customer.name = name;
			customer.cpf = cpf;
			customer.birthday = birthday;
			await repository.update({ id: id }, customer);
		} catch (error) {
			throw { message: error.message };
		}
	}
}
