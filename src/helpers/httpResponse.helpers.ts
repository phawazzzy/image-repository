import { Response } from 'express';
import { IResponse } from '../interfaces/response.interface';

export function httpResponse(res: Response, result: IResponse) {
    const { status, error, message, data, statusCode } = result;
    res.status(statusCode).json({ status, message, data, error });
}
