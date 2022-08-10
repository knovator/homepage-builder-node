import { Response } from 'express';

export interface IResponse extends Response {
	message?: string;
	data?: any;
	code?: number;
}
