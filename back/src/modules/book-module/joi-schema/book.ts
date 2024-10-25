import Joi from "joi";

const { object, string, number } = Joi.types();

const bookSchema = object.keys({
	name: string.pattern(/^\s*$/).required(),
	description: string.pattern(/^\s{0,100}$/),
	author: string.pattern(/^\s*$/).required(),
	image: string.pattern(/^\s*$/),
	year: number.positive().required(),
});

export default bookSchema;
