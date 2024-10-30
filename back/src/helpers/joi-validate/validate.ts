import type Joi from 'joi';

export function validate<T>(schema: Joi.ObjectSchema, data: T) {
	return schema.validate(data).error?.details[0].message;
}
