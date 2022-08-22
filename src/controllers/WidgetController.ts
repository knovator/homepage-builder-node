import { Types } from 'mongoose';
import { Widget } from './../models';
import { create, getAll, remove, update, list } from '../services/dbService';
import {
	successResponse,
	createdDocumentResponse,
} from './../utils/responseHandlers';

import { defaults } from '../utils/defaults';
import { IRequest } from '../../types/IRequest';
import { IResponse } from '../../types/IResponse';

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
	let customOptions = {
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
