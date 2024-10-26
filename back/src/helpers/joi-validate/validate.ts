import type Joi from "joi";

export default function validate<T>(schema: Joi.ObjectSchema, data: T) {
	return schema.validate(data).error?.details[0].message;
}
