import Joi from "joi";

const { object, string, number } = Joi.types();

const bookSchema = {
	create: object.keys({
		name: string.min(1).required(),
		description: string.max(100).required(),
		author: string.required(),
		image: string,
		year: number.positive().required(),
	}),
	edit: object.keys({
		name: string.min(1),
		description: string.max(100),
		author: string,
		image: string,
		year: number.positive(),
	}),
};

export default bookSchema;
