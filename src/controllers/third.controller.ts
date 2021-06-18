import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import ThirdService from '../services/third.service';
import AuthService from '../services/auth.service';
import {
	ICreateThird,
	IDeleteThird,
	IUpdateThird,
} from '../interfaces/third.interface';

export default class ThirdController {
	public async find(request: Hapi.Request, h: Hapi.ResponseToolkit) {
		const { cpf } = request.params.cpf;
		const third = await ThirdService.findThirdByCpf(cpf);
		if (!third) return Boom.notFound('Third not found');
		return h
			.response({
				message: 'Found',
				data: third,
			})
			.code(200);
	}
	public async findAll(request: Hapi.Request, h: Hapi.ResponseToolkit) {
		try {
			const authorized = AuthService.verifyRoleAuthorization(
				request.headers.authorization,
				'admin'
			);
			if (!authorized)
				return Boom.unauthorized('Unauthorized role for this request');
			const third = await ThirdService.findAllThird();
			return h
				.response({
					message: 'Found',
					data: third,
				})
				.code(200);
		} catch (error) {
			return Boom.notFound(error.message);
		}
	}
	public async create(request: ICreateThird, h: Hapi.ResponseToolkit) {
		try {
			const { cpf } = request.payload;
			await AuthService.verifyExistingUser(cpf);
			const id = await ThirdService.saveThird(request);
			return h
				.response({
					message: 'Created',
					id: id,
				})
				.code(201);
		} catch (error) {
			return Boom.badRequest(error.message);
		}
	}
	public async update(request: IUpdateThird, h: Hapi.ResponseToolkit) {
		try {
			await ThirdService.updateThird(request);
			return h
				.response({
					message: 'Updated',
				})
				.code(200);
		} catch (error) {
			return Boom.notFound(error.message);
		}
	}
	public async delete(request: IDeleteThird, h: Hapi.ResponseToolkit) {
		try {
			const { cpf } = request.payload;
			await ThirdService.deleteThird(cpf);
			return h
				.response({
					message: 'Deleted',
				})
				.code(200);
		} catch (error) {
			return Boom.notFound(error.message);
		}
	}
}
