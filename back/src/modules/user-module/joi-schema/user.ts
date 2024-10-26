import Joi from "joi";

const { object, string } = Joi.types();

const userSchema = object.keys({
	name: string.pattern(/^\s*$/).required(),
	password: string.pattern(/^\s*$/).required(),
	email: string.email().required(),
});

export default userSchema;
