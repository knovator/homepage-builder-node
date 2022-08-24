import joi from 'joi';
import { Widget, IWidgetSchema } from '../../models';
import { getOne } from '../../services/dbService';
import { VALIDATION } from '../../constants';
import { WidgetType, SelectionTypes } from '../../../types/enums';

const checkUnique = async (value: string) => {
	let result;
	try {
		// throws error if document found
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
	selectionTitle: joi.string().required(),
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
	selectionType: joi
		.string()
		.valid(...Object.values(SelectionTypes))
		.optional()
		.default(SelectionTypes.FixedCard),
});

export const update = joi.object<IWidgetSchema>({
	name: joi.string().required(),
	selectionTitle: joi.string().required(),
	webPerRow: joi.number().optional(),
	mobilePerRow: joi.number().optional(),
	tabletPerRow: joi.number().optional(),
	selectionType: joi
		.string()
		.valid(...Object.values(SelectionTypes))
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
