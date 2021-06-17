import * as Joi from 'joi';

export const createUserModel = Joi.object().keys({
	cpf: Joi.string().required(),
	name: Joi.string().required(),
	email: Joi.string().email().trim().required(),
	birthday: Joi.string().required(),
	password: Joi.string().trim().required(),
});
