import { Types, model, Schema, models } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { Widget } from './../models';
import { create, remove, update, list } from '../services/dbService';
import {
	successResponse,
	createdDocumentResponse,
} from './../utils/responseHandlers';

import { defaults } from '../utils/defaults';
import { IRequest } from '../../types/IRequest';
import { IResponse } from '../../types/IResponse';
import { SelectionTypes, WidgetType } from '../enums';

const catchAsync = (fn: any) => {
	return defaults.catchAsync(fn, 'Notification');
};

export const createWidget = catchAsync(
	async (req: IRequest, res: IResponse) => {
		const data = req.body;
		let notification = await create(Widget, data);
		res.message = req?.i18n?.t('widget.create');
		return createdDocumentResponse(notification, res);
	}
);

export const updateWidget = catchAsync(
	async (req: IRequest, res: IResponse) => {
		const data = req.body;
		const _id = req.params.id;
		let updatedNotification = await update(Widget, { _id }, data);
		res.message = req?.i18n?.t('widget.update');
		return successResponse(updatedNotification, res);
	}
);

export const deleteWidget = catchAsync(
	async (req: IRequest, res: IResponse) => {
		const _id = new Types.ObjectId(req.params.id);
		let deletedNotification = await remove(Widget, { _id });
		res.message = req?.i18n?.t('widget.update');
		return successResponse(deletedNotification, res);
	}
);

export const getWidgets = catchAsync(async (req: IRequest, res: IResponse) => {
	const search = req.body.search || '';
	let { page, limit } = req.body.options;
	let all =
		(typeof req.body.all !== 'undefined' && req.body.all === true) || false;
	let customOptions = {
		pagination: !all,
		...(page && limit ? { page, limit } : {}),
	};
	let query = {
		isDeleted: false,
		$or: [
			{
				name: {
					$regex: search,
					$options: 'i',
				},
			},
			{
				code: {
					$regex: search,
					$options: 'i',
				},
			},
		],
	};
	const notifications = await list(Widget, query, customOptions);
	res.message = req?.i18n?.t('widget.getAll');
	return successResponse(notifications, res);
});

export const partialUpdateWidget = catchAsync(
	async (req: IRequest, res: IResponse) => {
		const data = req.body;
		const _id = req.params.id;
		let updatedNotification = await update(Widget, { _id }, data);
		res.message = req?.i18n?.t('widget.partialUpdate');
		return successResponse(updatedNotification, res);
	}
);

export const getWidgetTypes = catchAsync(
	async (req: IRequest, res: IResponse) => {
		let widgetTypes: TypesType[] = [
			{
				value: Object.keys(WidgetType)[0],
				label: Object.values(WidgetType)[0],
			},
		];
		defaults.collections.forEach((item: CollectionItem) => {
			widgetTypes.push({
				value: item.collectionName,
				label: item.title,
			});
		});
		res.message = req?.i18n?.t('widget.getWidgetTypes');
		return successResponse(widgetTypes, res);
	}
);

export const getSelectionTypes = catchAsync(
	async (req: IRequest, res: IResponse) => {
		let selectionTypes = Object.entries(SelectionTypes).map((e) => ({
			label: e[1],
			value: e[0],
		}));
		res.message = req?.i18n?.t('widget.getSelectionTypes');
		return successResponse(selectionTypes, res);
	}
);

export const getCollectionData = catchAsync(
	async (req: IRequest, res: IResponse) => {
		const { search, collectionName } = req.body;
		const collectionItem: CollectionItem | undefined =
			defaults.collections.find(
				(collection) => collection.collectionName === collectionName
			);
		if (!collectionItem) {
			throw new Error(
				`No collection is specified with ${collectionName}`
			);
		}
		// setting up mongoose model
		let TempModel = models[collectionName];
		if (!TempModel) {
			const tempSchema = new Schema({}, { strict: false });
			tempSchema.plugin(mongoosePaginate);
			TempModel = model(collectionName, tempSchema);
		}
		// fetching data
		let query: any = collectionItem.filters || {};
		if (search) {
			query = {
				...query,
				$or: collectionItem.searchColumns.map((column) => ({
					[column]: {
						$regex: search,
						$options: 'i',
					},
				})),
			};
		}
		// @ts-ignore
		const collectionData = await list(TempModel, query, {});
		res.message = req?.i18n?.t('widget.getCollectionData');
		return successResponse(collectionData, res);
	}
);
