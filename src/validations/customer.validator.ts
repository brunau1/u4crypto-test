import * as Joi from 'joi';

export const createUserModel = Joi.object().keys({
	cpf: Joi.string().required(),
	role: Joi.string().required(),
	name: Joi.string().required(),
	email: Joi.string().email().trim().required(),
	birthday: Joi.string().required(),
	password: Joi.string().trim().required(),
});

export const updateUserModel = Joi.object().keys({
	id: Joi.string().required(),
	cpf: Joi.string().required(),
	name: Joi.string().required(),
	birthday: Joi.string().required(),
});
