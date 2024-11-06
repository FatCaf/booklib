import Joi from 'joi';

const { object, string } = Joi.types();

const readersDiarySchema = {
	borrow_book: {
		create: object.keys({
			user_id: string.required(),
			book_id: string.required(),
			borrow_date: string.required(),
		}),
		edit: object.keys({
			user_id: string.required(),
			book_id: string.required(),
			return_date: string,
			return_due: string,
		}),
	},
};

export default readersDiarySchema;
