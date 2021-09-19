import { InternalServerError, NotFound, Unauthorized } from 'http-errors';
import { inject, injectable } from 'inversify';
import TYPES from '../../config/types';
import { ImageRepoRepository } from '../repository/image-repo.repository';
import { AWSFileUploader } from './awsFileuploader.service';

@injectable()
export class ImageRepositoryService {
    constructor(@inject(TYPES.AWSFileUploader) private _awsFileUpload: AWSFileUploader, @inject(TYPES.ImageRepoRepository) private _repo: ImageRepoRepository) {}

    async addImages(data: any) {
        // console.log(data);
        try {
            const userId = data.userId;
            const listOfImages = [];

            for (let i = 0; i < data.files.length; i++) {
                //TODO
                // check mime type before uploading
                const fileDetails: any = await this.upload(data.files[i]);
                if (!fileDetails) {
                    continue;
                }
                const saveImage = await this._repo.create({
                    imagePath: fileDetails.path,
                    imageName: fileDetails.name,
                    owner: userId,
                    private: data.private ? true : false
                });

                if (!saveImage) {
                    throw new InternalServerError('Unable to save the file details to the db');
                }
                listOfImages.push(saveImage);
            }

            return {
                status: true,
                message: 'Your images has been saved successfully',
                data: listOfImages,
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
            const filePath = await this._awsFileUpload.upload(data);
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

    async getFreeImages() {
        try {
            const images = await this._repo.findAll({ private: false });
            if (!images) {
                throw new InternalServerError('Unable to fetch data from the DB');
            }

            if (images.length < 1) {
                return {
                    status: 200,
                    message: 'There is no public images at the moment',
                    data: {},
                    error: null
                };
            }

            return {
                status: 200,
                message: 'There is no public images at the moment',
                data: images,
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

    async deleteOwnImage(data: { userId: string; imageId: string }) {
        try {
            const image = await this._repo.findById(data.imageId);
            if (!image) {
                throw new NotFound('Image not found');
            }

            if (image.owner !== data.userId) {
                throw new Unauthorized('You are not authorized to delete an image that are not yours');
            }

            const deleteImage = await this._repo.deleteOne({ _id: data.imageId });
            if (!deleteImage) {
                throw new InternalServerError('Image was not deleted');
            }
            // delete from the cloudStorage
            await this._awsFileUpload.deleteFileInCloudinary(image.imageName);
            return {
                status: 204,
                message: 'image/s succesfully deleted',
                data: {},
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
}
