import joi from 'joi';
import { Page, IPageSchema } from '../../models';
import { getOne } from '../../services/dbService';
import { VALIDATION } from '../../constants';

const checkUnique = async (value: string) => {
	let result;
	try {
		// throws error if document not found
		result = await getOne(Page, {
			code: value,
		});
	} catch (e) {}
	if (result) {
		throw new Error(VALIDATION.WIDGET_EXISTS);
	}
};

export const create = joi.object<IPageSchema>({
	name: joi.string().required(),
	code: joi
		.string()
		.uppercase()
		.replace(/\s+/g, '_')
		.external(checkUnique)
		.required(),
	widgets: joi.array().items(joi.string()).optional(),
});

export const update = joi.object<IPageSchema>({
	name: joi.string().optional(),
	widgets: joi.array().items(joi.string()).optional(),
});

export const list = joi.object({
	search: joi.string().allow('').replace(/\s+/g, '_').optional().default(''),
	options: joi
		.object({
			// sort: joi.alternatives().try(joi.object(), joi.string()).optional(),
			populate: joi.array().items().optional().default([]),
			offset: joi.number().optional(),
			page: joi.number().optional(),
			limit: joi.number().optional(),
			pagination: joi.boolean().default(false),
		})
		.default({}),
});
