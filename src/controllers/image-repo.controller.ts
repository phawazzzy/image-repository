import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpDelete, httpGet, httpPost } from 'inversify-express-utils';
import multer from 'multer';
import TYPES from '../../config/types';
import { authenticate } from '../decorators/authenticate.decorator';
import { fileHandler } from '../middlewares/fileHandler';
import { ImageRepositoryService } from '../services/imageRepository.service';

const uplaod = multer();

@controller('/api/v1/repo')
export class ImageRepository {
    constructor(@inject(TYPES.ImageRepoService) private _imageRepoService: ImageRepositoryService) {}

    @httpPost('/', uplaod.array('image', 100), fileHandler)
    @authenticate({})
    async upload(req: Request, res: Response) {
        const result = await this._imageRepoService.addImages(req.body);
        return result;
    }

    @httpGet('/')
    async getFreeImage(req: Request, res: Response) {
        return await this._imageRepoService.getFreeImages();
    }

    @httpDelete('/delete')
    async deleteImages(req: Request, res: Response) {
        return await this._imageRepoService.deleteOwnImage(req.body);
    }
}
