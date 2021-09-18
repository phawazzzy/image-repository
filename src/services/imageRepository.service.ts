import { InternalServerError } from 'http-errors';
import { inject, injectable } from 'inversify';
import TYPES from '../../config/types';
import { ImageRepoRepository } from '../repository/image-repo.repository';
import { AWSFileUploader } from './awsFileuploader.service';

@injectable()
export class ImageRepositoryService {
    constructor(@inject(TYPES.AWSFileUploader) private _awsFileUpload: AWSFileUploader, @inject(TYPES.ImageRepoRepository) private _repo: ImageRepoRepository) {}

    async addImages(data: any) {
        try {
            const userId = data.userId;
            const fileDetails: any = await this.upload(data);
            const saveImage = await this._repo.create({
                imagePath: fileDetails.path,
                imageName: fileDetails.name,
                owner: userId,
                private: data.private ? true : false
            });
            if (!saveImage) {
                throw new InternalServerError('Unable to save the file details to the db');
            }
            return {
                status: true,
                message: 'Your image has been saved successfully',
                data: saveImage,
                error: null
            };
        } catch (error: any) {
            return {
                status: false,
                message: error.message || 'Error occured while adding the image',
                data: {},
                error
            };
        }
    }

    async upload(data: any) {
        try {
            // const userId = data.userId;
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
