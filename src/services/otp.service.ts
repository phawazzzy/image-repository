import { Forbidden } from 'http-errors';
import { inject, injectable } from 'inversify';
import TYPES from '../../config/types';
import { OtpRepository } from '../repository/otp.repository';

@injectable()
export class OtpService {
    constructor(@inject(TYPES.OtpRepository) private _otpRepo: OtpRepository) {}

    async createOtp(email: string) {
        const code = this.generate();
        console.log(code);

        try {
            const checkCode = await this._otpRepo.findLastRecord({ email, used: false });
            if (checkCode) return checkCode.code;
            const savedCode = await this._otpRepo.create({ code, time: Date.now(), email, used: false });
            if (savedCode) return code;
        } catch (error) {
            console.log(error);
        }
        throw Error('Could not create otp');
    }

    async verifyOtp(email: string, code: any) {
        try {
            const checkCode = await this._otpRepo.findLastRecord({ email, used: false });

            if (checkCode.code == code) {
                await this._otpRepo.updateOne({ _id: checkCode._id }, { used: true });
                return true;
            }
        } catch (error) {
            // console.log(error);
        }
        throw new Forbidden('Invalid code');
    }

    generate() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
}
