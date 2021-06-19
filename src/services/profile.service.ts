import { getConnection } from 'typeorm';
import {
	ICreateCustomer,
	IUpdateCustomer,
} from '../interfaces/customer.interface';
import { v4 as uuid } from 'uuid';
import Profile from '../models/profile.model';
import { ICreateThird, IUpdateThird } from '../interfaces/third.interface';

export default class ProfileService {
	static async createProfile(
		request: ICreateCustomer | ICreateThird,
		customerId?: string,
		thirdId?: string
	) {
		const { name, cpf, birthday } = request.payload;
		const connection = getConnection();
		const repository = connection.getRepository(Profile);
		const profile = new Profile();
		profile.id = uuid().toString();
		profile.thirdId = thirdId;
		profile.customerId = customerId;
		profile.cpf = cpf;
		profile.name = name;
		profile.birthday = new Date(birthday).toISOString();
		await repository.save(profile);
		return profile.id;
	}

	static async updateProfile(
		request: IUpdateCustomer | IUpdateThird,
		type: string
	) {
		try {
			const { id, name, birthday } = request.payload;
			const connection = getConnection();
			const repository = connection.getRepository(Profile);
			const profile =
				type == 'customer'
					? await repository.findOne({ customerId: id })
					: await repository.findOne({ thirdId: id });
			if (!profile) throw { message: 'user not found' };
			profile.name = name;
			profile.birthday = new Date(birthday).toISOString();
			await repository.update({ id: profile.id }, profile);
			console.log(profile);
		} catch (error) {
			throw { message: error.message };
		}
	}
}
