import { inject, injectable } from 'inversify';
import TYPES from '../../config/types';
import { AWSFileUploader } from './awsFileuploader.service';

@injectable()
export class ImageRepositoryService {
    constructor(@inject(TYPES.AWSFileUploader) private _awsFileUpload: AWSFileUploader) {}

    async addImages(data: any) {
        try {
            return await this.upload(data);
        } catch (error: any) {
            return {
                status: false,
                message: error.message || 'Error occured while adding the image',
                data: {},
                error: null
            };
        }
    }

    async upload(data: any) {
        try {
            const userId = '';
            const filePath = await this._awsFileUpload.upload(data);
            console.log(filePath);
            if (!filePath) {
                throw Error('unable to upload image');
            }
            return filePath;
        } catch (error) {
            return {
                error: 'Error occured during image upload',
                data: null
            };
        }
    }
}
