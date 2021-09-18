import { inject, injectable } from 'inversify';
import TYPES from '../../config/types';
import { AWSFileUploader } from './awsFileuploader.service';

@injectable()
export class ImageRepositoryService {
    constructor(@inject(TYPES.AWSFileUploader) private _awsFileUpload: AWSFileUploader) {}

    async addImages(data: any) {
        console.log(data);
    }
}
