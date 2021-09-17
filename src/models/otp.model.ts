import { injectable } from 'inversify';
import mongoose, { Schema } from 'mongoose';
import { IModelFactory } from '../repository';

const otpSchema = new Schema({
    email: { type: String, required: true },
    time: { type: Date, required: true },
    used: { type: Boolean, required: true },
    code: { type: String, required: true }
});

@injectable()
export class OtpModel implements IModelFactory {
    model() {
        return mongoose.model('otp', otpSchema);
    }
}
