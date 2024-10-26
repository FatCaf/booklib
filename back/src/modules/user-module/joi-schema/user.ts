import Joi from "joi";

const { object, string } = Joi.types();

const userSchema = object.keys({
	name: string.min(1).required(),
	password: string.min(8).required(),
	email: string.email().required(),
	role: string,
});

export default userSchema;
