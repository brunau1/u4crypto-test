import * as Joi from 'joi';

export const createThirdModel = Joi.object().keys({
	cpf: Joi.string().required(),
	name: Joi.string().required(),
	birthday: Joi.string().required(),
});

export const updateThirdModel = Joi.object().keys({
	cpf: Joi.string().required(),
	name: Joi.string().required(),
	birthday: Joi.string().required(),
});

export const deleteThirdModel = Joi.object().keys({
	cpf: Joi.string().required(),
});
