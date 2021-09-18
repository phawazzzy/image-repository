import { File, FileUploader, UploadedFile } from '../interfaces/file.interface';
import { S3 } from 'aws-sdk';
import config from '../../config';
import { injectable } from 'inversify';

@injectable()
export class AWSFileUploader implements FileUploader {
    private client: S3;

    private readonly bucketName = config.server.bucketName;

    constructor() {
        this.client = new S3({
            region: config.server.defaultRegion
        });

        /**
         * cloudinary config
         */

        // cloudinary.v2.config({
        //     cloud_name: config.server.cloud_name,
        //     api_key: config.server.cloud_key,
        //     api_secret: config.server.cloud_secret
        // });
    }

    private generateFileKey(file: File, timestamp: number): string {
        return `${file.name}-${timestamp}.${file.extension}`;
    }

    private async uploadFileToS3(file: File): Promise<UploadedFile> {
        const timestamp = Date.now();
        const fileKey = this.generateFileKey(file, timestamp);
        await this.client
            .putObject({
                Bucket: this.bucketName,
                Key: fileKey,
                ContentType: file.type,
                Body: file.content,
                ACL: 'public-read'
            })
            .promise();

        return {
            path: `${this.bucketName}/${fileKey}`,
            name: fileKey
        };
    }

    async upload(files: File): Promise<UploadedFile | undefined> {
        try {
            return await this.uploadFileToS3(files);
        } catch (error) {
            console.log('error', error);
            return undefined;
        }
    }
}
