import { inject, injectable } from 'inversify';
import TYPES from '../../config/types';
import { IResponse } from '../interfaces/response.interface';
import { IUserInterface } from '../interfaces/user-signup.interface';
import { UserRepository } from '../repository';
import { BadRequest, Conflict, Forbidden, InternalServerError, NotFound, Unauthorized } from 'http-errors';
import { HashService } from './hash.service';
import { OtpService } from './otp.service';
import { EmailSendingService } from './email.service';

@injectable()
export class UserService {
    constructor(@inject(TYPES.UserRepositry) private _repo: UserRepository, @inject(TYPES.OtpService) private _otpService: OtpService) {}

    async userSignup(data: IUserInterface): Promise<IResponse> {
        try {
            const { firstName, lastName, email, phoneNumber, password } = data;
            // check if user exist before
            const user = await this._repo.findOne({ email });
            if (user) {
                if (!this.userIsVerified(user)) {
                    await this.sendRegistrationOtp(user.email, user.firstName);
                    throw new Conflict('Email already exist please check your email to verify');
                }
                // check if user has verified account
                throw new Conflict('Email exist');
            }
            const passwordHash = await HashService.hashPassword(password);
            const createUser = await this._repo.create({ firstName, lastName, email, phoneNumber, password: passwordHash });
            if (!createUser) {
                throw new InternalServerError("Unable to save user's data");
            }
            return {
                status: true,
                statusCode: 201,
                message: 'User created succesfully',
                data: createUser,
                error: null
            };
        } catch (error: any) {
            return {
                status: false,
                statusCode: error.statusCode || error.status || 500,
                message: error.message || 'Internal server error',
                error
            };
        }
    }

    async sendRegistrationOtp(email: string, firstName: string) {
        try {
            const code = await this._otpService.createOtp(email);
            await EmailSendingService.sendRegistrationCode(firstName, email, code);
        } catch (error) {}
    }

    userIsVerified(userData: any) {
        return userData.verified == 'true' || userData.verified == true;
    }
}
