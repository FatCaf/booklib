import Joi from "joi";

const { object, string } = Joi.types();

const userSchema = object.keys({
	name: string,
	password: string,
	email: string.email().required(),
});

export default userSchema;
