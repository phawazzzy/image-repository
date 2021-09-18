import { inject, injectable } from 'inversify';
import TYPES from '../../config/types';
import { IResponse } from '../interfaces/response.interface';
import { IUserInterface } from '../interfaces/user-signup.interface';
import { UserRepository } from '../repository';
import { BadRequest, Conflict, Forbidden, InternalServerError, NotFound, Unauthorized } from 'http-errors';
import { HashService } from './hash.service';
import { OtpService } from './otp.service';
import { JWTService } from './jwt.service';

@injectable()
export class UserService {
    constructor(@inject(TYPES.UserRepositry) private _repo: UserRepository, @inject(TYPES.OtpService) private _otpService: OtpService) {}

    async userSignup(data: IUserInterface): Promise<IResponse> {
        try {
            const { firstName, email, password } = data;
            // check if user exist before
            const user = await this._repo.findOne({ email });
            if (user) {
                throw new Conflict('Email exist');
            }
            const passwordHash = await HashService.hashPassword(password);
            const createUser = await this._repo.create({ firstName, email, password: passwordHash });
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

    // async sendRegistrationOtp(email: string, firstName: string) {
    //     try {
    //         const code = await this._otpService.createOtp(email);
    //         await EmailSendingService.sendRegistrationCode(firstName, email, code);
    //     } catch (error) {}
    // }

    // userIsVerified(userData: any) {
    //     return userData.verified == 'true' || userData.verified == true;
    // }

    async userLogin(email: string, password: string): Promise<IResponse> {
        try {
            // check if user exist
            const user = await this._repo.findOne({ email });
            if (!user) {
                throw new Unauthorized('Wrong credentials');
            }

            const passwordValid = await HashService.isPasswordValid(user.password, password);
            if (!passwordValid) {
                throw new Unauthorized('Wrong credentials');
            }
            const token = await JWTService.generateToken({ userId: user._id });

            return {
                status: true,
                statusCode: 200,
                data: {
                    email: user.email,
                    firstName: user.firstName,
                    token
                },
                message: 'Authentication successful',
                error: null
            };
        } catch (error: any) {
            return {
                status: false,
                statusCode: error.status || 400,
                data: null,
                message: error.message,
                error
            };
        }
    }
}
