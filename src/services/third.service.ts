import { getConnection } from 'typeorm';
import { ICreateThird, IUpdateThird } from '../interfaces/third.interface';
import { v4 as uuid } from 'uuid';
import Third from '../models/third.model';

export default class ThirdService {
	static async findThirdByCpf(cpf) {
		const connection = getConnection();
		const repository = connection.getRepository(Third);
		return await repository.findOne({ cpf: cpf });
	}

	static async findAllThird() {
		const connection = getConnection();
		const repository = connection.getRepository(Third);
		return await repository.find();
	}

	static async deleteThird(cpf: string) {
		const connection = getConnection();
		const repository = connection.getRepository(Third);
		await repository.delete({ cpf: cpf });
	}
	static async saveThird(request: ICreateThird) {
		try {
			const { name, cpf, birthday } = request.payload;
			const connection = getConnection();
			const repository = connection.getRepository(Third);
			const third = new Third();
			third.id = uuid().toString();
			third.cpf = cpf;
			third.name = name;
			third.birthday = new Date(birthday).toISOString();
			await repository.save(third);
			return third.id;
		} catch (error) {
			throw { message: 'Failed to save third' };
		}
	}
	static async updateThird(request: IUpdateThird) {
		const { name, cpf, birthday } = request.payload;
		const connection = getConnection();
		const repository = connection.getRepository(Third);
		const third: Third = await repository.findOne({ cpf: cpf });
		if (!third) throw { message: 'Third not found' };
		third.name = name;
		third.birthday = new Date(birthday).toISOString();
		await repository.save(third);
		return third.id;
	}

	static async verifyExistingThird(cpf: string) {
		const connection = getConnection();
		const repository = connection.getRepository(Third);
		if (await repository.findOne({ cpf: cpf }))
			throw { message: 'A third with the same CPF is already registered' };
	}
}
