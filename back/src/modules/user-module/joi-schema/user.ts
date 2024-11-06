import Joi from 'joi';

const { object, string } = Joi.types();

const userSchema = {
	create: object.keys({
		name: string.min(1).required(),
		password: string.min(8).required(),
		email: string.email().required(),
		role: string,
	}),
	edit: object.keys({
		name: string,
		email: string,
	}),
};

export default userSchema;
