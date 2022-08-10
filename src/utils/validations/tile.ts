import joi from 'joi';
import { ITileSchema } from '../../models';

export const create = joi.object<ITileSchema>({
	widgetId: joi.string().required(),
	title: joi.string().required(),
	alt: joi.string().optional(),
	link: joi.string().required(),
});

export const update = joi.object<ITileSchema>({
	widgetId: joi.string().required(),
	title: joi.string().required(),
	alt: joi.string().optional(),
	link: joi.string().required(),
});

export const list = joi.object({
	search: joi.string().allow('').replace(/\s+/g, '_').default(''),
});
