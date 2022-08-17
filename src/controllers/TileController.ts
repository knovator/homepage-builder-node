import { Types } from 'mongoose';
import { Tile } from './../models';
import { create, remove, update, getAll } from '../services/dbService';
import {
	successResponse,
	createdDocumentResponse,
} from './../utils/responseHandlers';

import { defaults } from '../utils/defaults';
import { IRequest } from '../../types/IRequest';
import { IResponse } from '../../types/IResponse';
import { TileTypes } from '../enums';

const catchAsync = (fn: any) => {
	return defaults.catchAsync(fn, 'Notification');
};

export const createTile = catchAsync(async (req: IRequest, res: IResponse) => {
	const data = req.body;
	let createdTile = await create(Tile, data);
	res.message = req?.i18n?.t('tile.create');
	return createdDocumentResponse(createdTile, res);
});

export const updateTile = catchAsync(async (req: IRequest, res: IResponse) => {
	const data = req.body;
	const _id = req.params.id;
	let updatedTile = await update(Tile, { _id }, data);
	res.message = req?.i18n?.t('tile.update');
	return successResponse(updatedTile, res);
});

export const deleteTile = catchAsync(async (req: IRequest, res: IResponse) => {
	const _id = new Types.ObjectId(req.params.id);
	let deletedTile = await remove(Tile, { _id });
	res.message = req?.i18n?.t('tile.delete');
	return successResponse(deletedTile, res);
});

export const getTiles = catchAsync(async (req: IRequest, res: IResponse) => {
	let widgetId = req.params.widgetId;
	const webTiles = await getAll(Tile, { widgetId, tileType: TileTypes.Web });
	const mobileTiles = await getAll(Tile, {
		widgetId,
		tileType: TileTypes.Mobile,
	});
	res.message = req?.i18n?.t('tile.getAll');
	return successResponse({ web: webTiles, mobile: mobileTiles }, res);
});
