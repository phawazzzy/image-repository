import { File, FileUploader, UploadedFile } from '../interfaces/file.interface';
import { S3 } from 'aws-sdk';
import config from '../../config';
import { injectable } from 'inversify';
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';

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

        cloudinary.v2.config({
            cloud_name: config.server.cloud_name,
            api_key: config.server.cloud_key,
            api_secret: config.server.cloud_secret
        });
    }

    private generateFileKey(file: File, timestamp: number): string {
        return `${file.name}-${timestamp}.${file.extension}`;
    }

    private async uploadFileToS3(file: File): Promise<UploadedFile> {
        const timestamp = Date.now();
        const fileKey = this.generateFileKey(file, timestamp);
        const hi = await this.client
            .putObject({
                Bucket: this.bucketName,
                Key: fileKey,
                ContentType: file.type,
                Body: file.content,
                ACL: 'public-read'
            })
            .promise();
        console.log(hi);
        return {
            url: `https://revie.s3.amazonaws.com/${fileKey}`,
            path: `${this.bucketName}/${fileKey}`,
            name: fileKey
        };
    }

    private async uploadFileToCloudinary(file: File): Promise<UploadedFile> {
        return new Promise((resolve, reject) => {
            let cldUploadStream = cloudinary.v2.uploader.upload_stream(
                {
                    folder: 'shopify-challenge'
                },
                async function (error, result) {
                    if (result) {
                        resolve({
                            path: result.url,
                            name: result.public_id
                        });
                    } else {
                        reject(error);
                    }
                }
            );
            streamifier.createReadStream(this.toBuffer(file.content)).pipe(cldUploadStream);
        });
    }

    private toBuffer(arrayBuffer: ArrayBuffer) {
        const buf = Buffer.alloc(arrayBuffer.byteLength);
        const view = new Uint8Array(arrayBuffer);
        for (var i = 0; i < buf.length; ++i) {
            buf[i] = view[i];
        }
        return buf;
    }

    async upload(files: File): Promise<UploadedFile | undefined> {
        try {
            return await this.uploadFileToCloudinary(files);
            // return await this.uploadFileToS3(files);
        } catch (error) {
            console.log('error', error);
            return undefined;
        }
    }

    async deleteFileInCloudinary(publicId: string) {
        cloudinary.v2.uploader.destroy(publicId, (err, result) => {
            if (err) console.log(err);
            console.log(`Deleted file ${result}`);
        });
    }
}
