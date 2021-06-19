import { getConnection } from 'typeorm';
import {
	ICreateCustomer,
	IUpdateCustomer,
} from '../interfaces/customer.interface';
import { v4 as uuid } from 'uuid';
import Customer from '../models/customer.model';
import Crypto from '../utils/crypto';
import JWT from '../utils/jwt';
import ProfileService from './profile.service';
import Profile from '../models/profile.model';

export default class CustomerService {
	static async findAllCustomers() {
		const connection = getConnection();
		const cRepository = connection.getRepository(Customer);
		const pRepository = connection.getRepository(Profile);
		const customers = await cRepository.find();
		const foundCustomers = [];
		for (const customer of customers) {
			const profile = await pRepository.findOne(
				{ customerId: customer.id },
				{ select: ['cpf', 'name', 'birthday'] }
			);
			foundCustomers.push({ ...profile, ...customer });
		}
		return foundCustomers;
	}

	static async findCustomerById(authorization) {
		const decoded = JWT.decode(authorization);
		const connection = getConnection();
		const cRepository = connection.getRepository(Customer);
		const pRepository = connection.getRepository(Profile);
		const profile = await pRepository.findOne(
			{ customerId: decoded['id'] },
			{ select: ['cpf', 'name', 'birthday'] }
		);
		const customer = await cRepository.findOne(decoded['id']);
		return { ...profile, ...customer };
	}

	static async deleteCustomer(id: string) {
		const connection = getConnection();
		const cRepository = connection.getRepository(Customer);
		const pRepository = connection.getRepository(Profile);
		const profile = await pRepository.findOne({ customerId: id });
		profile.customerId = null;
		await cRepository.delete({ id: id });
		await pRepository.update({ id: profile.id }, profile);
	}
	static async saveCustomer(request: ICreateCustomer, profile: Profile) {
		try {
			const { role, email } = request.payload;
			const connection = getConnection();
			const repository = connection.getRepository(Customer);
			const password = Crypto.encrypt(request.payload.password);
			const customer = new Customer();
			customer.id = uuid().toString();
			let profileId = null;
			if (profile) {
				profileId = profile.id;
				if (!profile.customerId) {
					profile.customerId = customer.id;
					connection.getRepository(Profile).update({ id: profile.id }, profile);
				}
			} else
				profileId = await ProfileService.createProfile(
					request,
					customer.id,
					null
				);
			customer.role = role;
			customer.email = email;
			customer.password = password;
			customer.profileId = profileId;
			await repository.save(customer);
			return { id: customer.id, role: customer.role };
		} catch (error) {
			throw { message: 'Failed to save customer' };
		}
	}
}
