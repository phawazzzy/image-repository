import { Express, Request, Response, NextFunction } from 'express';
import { File } from '../interfaces/file.interface';
import { Multer } from 'multer';

export const fileHandler = (req: Request, _: Response, next: NextFunction) => {
    // const { file } = req;
    if (req.file) {
        const file = {
            name: req.file?.originalname,
            type: req.file?.mimetype,
            content: req.file!.buffer,
            size: req.file?.size,
            extension: `${req.file?.originalname.split('.').pop()}`
        };
        Object.assign(req.body, file);
    }

    // const file: File = {
    //      name: file.originalname,
    //     type: file.mimetype,
    //     content: file.buffer,
    //     size: file.size,
    //     extension: `${file.originalname.split('.').pop()}`
    // }
    // }
    // const mappedFiles: File[] = ((files as Express.Multer.File[]) || []).map((file) => ({
    //     name: file.originalname,
    //     type: file.mimetype,
    //     content: file.buffer,
    //     size: file.size,
    //     extension: `${file.originalname.split('.').pop()}`
    // }));

    // Object.assign(req.body, { files: mappedFiles });
    return next();
};
