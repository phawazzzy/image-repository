import { injectable } from 'inversify';
import mongoose, { Schema } from 'mongoose';
import { IModelFactory } from '../repository/crud.repository';

const UserSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        password: { type: String, required: true },
        isVerified: { type: Boolean, default: false },
        kycVerified: { type: Boolean, defualt: true }
    },
    { timestamps: true }
);

UserSchema.index({ email: 1 });
@injectable()
export class UserModel implements IModelFactory {
    model() {
        return mongoose.model('User', UserSchema);
    }
}
