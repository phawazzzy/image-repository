import { injectable } from 'inversify';
import mongoose, { Schema } from 'mongoose';
import modelNames from '../../config/model-names';
import { IModelFactory } from '../repository';

const imageRepoSchema = new Schema(
    {
        imagePath: { type: String, required: true },
        imageName: { type: String, required: true },
        owner: { type: Schema.Types.ObjectId, ref: 'users', required: true },
        private: { type: Boolean, default: false }
    },
    { timestamps: true }
);

@injectable()
export class ImageRepoModel implements IModelFactory {
    model() {
        return mongoose.model(modelNames.imageModel, imageRepoSchema);
    }
}
