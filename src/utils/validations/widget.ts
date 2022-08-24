import joi from 'joi';
import { Widget, IWidgetSchema } from '../../models';
import { getOne } from '../../services/dbService';
import { VALIDATION } from '../../constants';
import { WidgetType, CardTypes } from '../../../types/enums';

const checkUnique = async (value: string) => {
	let result;
	try {
		// throws error if document not found
		result = await getOne(Widget, {
			code: value,
		});
	} catch (e) {}
	if (result) {
		throw new Error(VALIDATION.WIDGET_EXISTS);
	}
};

export const create = joi.object<IWidgetSchema>({
	name: joi.string().required(),
	code: joi
		.string()
		.uppercase()
		.replace(/\s+/g, '_')
		.external(checkUnique)
		.required(),
	webPerRow: joi.number().optional(),
	mobilePerRow: joi.number().optional(),
	tabletPerRow: joi.number().optional(),
	widgetType: joi
		.string()
		.valid(...Object.values(WidgetType))
		.optional()
		.default(WidgetType.Static),
	cardType: joi
		.string()
		.valid(...Object.values(CardTypes))
		.optional()
		.default(CardTypes.Fixed),
	// widgetType: joi
	// 	.array()
	// 	.items(joi.string().valid(Object.values(WidgetType)))
	// 	.optional(),
	// cardType: joi
	// 	.array()
	// 	.items(joi.string().valid(Object.values(CardTypes)))
	// 	.optional(),
});

export const update = joi.object<IWidgetSchema>({
	name: joi.string().optional(),
	webPerRow: joi.number().optional(),
	mobilePerRow: joi.number().optional(),
	tabletPerRow: joi.number().optional(),
	cardType: joi
		.string()
		.valid(...Object.values(CardTypes))
		.optional(),
});

export const list = joi.object({
	search: joi.string().allow('').replace(/\s+/g, '_').optional().default(''),
	options: joi
		.object({
			// sort: joi.alternatives().try(joi.object(), joi.string()).optional(),
			// populate: joi.array().items().optional(),
			offset: joi.number().optional(),
			page: joi.number().optional(),
			limit: joi.number().optional(),
		})
		.default({}),
	all: joi.boolean().default(false),
});
