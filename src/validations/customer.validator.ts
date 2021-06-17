import * as Joi from 'joi';

export const createCustomerModel = Joi.object().keys({
	cpf: Joi.string().required(),
	role: Joi.string(),
	name: Joi.string().required(),
	email: Joi.string().email().trim().required(),
	birthday: Joi.string().required(),
	password: Joi.string().trim().required(),
});

export const updateCustomerModel = Joi.object().keys({
	id: Joi.string().required(),
	cpf: Joi.string().required(),
	name: Joi.string().required(),
	birthday: Joi.string().required(),
});

export const deleteCustomerModel = Joi.object().keys({
	id: Joi.string().required(),
});
