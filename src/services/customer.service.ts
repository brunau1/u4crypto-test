import { getConnection } from 'typeorm';
import {
	ICreateCustomer,
	IUpdateCustomer,
} from '../interfaces/customer.interface';
import { v4 as uuid } from 'uuid';
import Customer from '../models/customer.model';
import Crypto from '../utils/crypto';
import JWT from '../utils/jwt';

export default class CustomerService {
	static async findAllCustomers() {
		const connection = getConnection();
		const repository = connection.getRepository(Customer);
		return await repository.find();
	}

	static async findCustomerById(authorization) {
		const decoded = JWT.decode(authorization);
		const connection = getConnection();
		const repository = connection.getRepository(Customer);
		return await repository.findOne(decoded['id']);
	}

	static async deleteCustomer(id: string) {
		const connection = getConnection();
		const repository = connection.getRepository(Customer);
		await repository.delete({ id: id });
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
			customer.role = role || 'customer';
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
			const { id, name, birthday } = request.payload;
			const connection = getConnection();
			const repository = connection.getRepository(Customer);
			const customer: Customer = await repository.findOne(id);
			if (!customer) throw { message: 'Customer not found' };
			customer.name = name;
			customer.birthday = new Date(birthday).toISOString();
			await repository.update({ id: id }, customer);
		} catch (error) {
			throw { message: error.message };
		}
	}

	static async verifyExistingCustomer(cpf: string, email?: string) {
		const connection = getConnection();
		const repository = connection.getRepository(Customer);
		if (email && (await repository.findOne({ email: email })))
			throw { message: 'A customer with the same email is already registered' };
		if (await repository.findOne({ cpf: cpf }))
			throw { message: 'A customer with the same CPF is already registered' };
	}
}
