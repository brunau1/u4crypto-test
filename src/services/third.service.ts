import { getConnection } from 'typeorm';
import { ICreateThird, IUpdateThird } from '../interfaces/third.interface';
import { v4 as uuid } from 'uuid';
import Third from '../models/third.model';
import ProfileService from './profile.service';
import Profile from '../models/profile.model';

export default class ThirdService {
	static async findThirdByCpf(cpf: string) {
		const connection = getConnection();
		const pRepository = connection.getRepository(Profile);
		const tRepository = connection.getRepository(Third);
		const profile = await pRepository.findOne(
			{ cpf: cpf },
			{ select: ['cpf', 'name', 'birthday'] }
		);
		const third = await tRepository.findOne({ id: profile.thirdId });
		return { ...third, ...profile };
	}

	static async findAllThird() {
		const connection = getConnection();
		const pRepository = connection.getRepository(Profile);
		const tRepository = connection.getRepository(Third);
		const thirds = await tRepository.find();
		const foundThird = [];
		for (const third of thirds) {
			const profile = await pRepository.findOne(
				{ thirdId: third.id },
				{ select: ['cpf', 'name', 'birthday'] }
			);
			foundThird.push({ ...third, ...profile });
		}
		return foundThird;
	}

	static async deleteThird(id: string) {
		const connection = getConnection();
		const tRepository = connection.getRepository(Third);
		const pRepository = connection.getRepository(Profile);
		const profile = await pRepository.findOne({ thirdId: id });
		await tRepository.delete({ id: id });
		profile.thirdId = null;
		await pRepository.update({ id: profile.id }, profile);
	}
	static async saveThird(request: ICreateThird, profile: Profile) {
		try {
			const connection = getConnection();
			const repository = connection.getRepository(Third);
			const third = new Third();
			third.id = uuid().toString();
			let profileId = null;
			if (profile) {
				profileId = profile.id;
				if (!profile.thirdId) {
					profile.thirdId = third.id;
					connection.getRepository(Profile).update({ id: profile.id }, profile);
				}
			} else
				profileId = await ProfileService.createProfile(request, null, third.id);
			third.profileId = profileId;
			await repository.save(third);
			return third.id;
		} catch (error) {
			throw { message: 'Failed to save third' };
		}
	}
}
