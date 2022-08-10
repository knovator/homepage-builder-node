import { Request } from 'express';

export interface IRequest extends Request {
	i18n?: any;
}
