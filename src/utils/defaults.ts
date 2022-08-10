import { NextFunction } from 'express';
import { IRequest } from '../../types/IRequest';
import { IResponse } from '../../types/IResponse';
import { RESPONSE_CODES, internalServerError, REGEXS } from '../constants';

export const defaults = {
	logger: console as any,
	catchAsync:
		(fn: any, modal: string = '') =>
		(req: IRequest, res: IResponse, next: NextFunction) => {
			Promise.resolve(fn(req, res, next)).catch((err) => {
				let message = (err as Error).message;
				if (message.match(REGEXS.OBJECTID_CAST_FAILED)) {
					message = `${modal} not found with given id!`;
				}
				// this.logger.error(err.message);
				res.status(internalServerError).json({
					code: RESPONSE_CODES.ERROR,
					message,
					data: undefined,
				});
			});
		},
};
