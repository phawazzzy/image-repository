import axios from 'axios';
import config from '../../config';
import { IEmailBody } from '../interfaces';

export const TEMPLATES = {
    REQUEST: 'request',
    VERIFY: 'verify',
    PAID: 'paid',
    RECEIPT: 'receipt',
    WELCOME: 'welcome'
};

export class EmailSendingService {
    static async sendRegistrationCode(name: string, email: string, code: string) {
        try {
            const body = `Hello ${name} You have successfully registered on Payday\n Here is your verification code ${code}`;
            const subject = 'AUFERA Registration - Welcome';
            const data = { code };
            return await this.callEmailService({ receiver: email, body, subject, templateKey: TEMPLATES.VERIFY, data });
        } catch (error) {
            return error;
        }
    }

    static async sendRegistrationConfirmation(email: string, name: string) {
        try {
            const body = `Hello ${email} You have successfully confirmed you account, welcome`;
            const subject = 'Welcome || Thanks for joining PayDay';
            const data = { name };
            return await this.callEmailService({
                receiver: email,
                body,
                subject,
                templateKey: TEMPLATES.WELCOME,
                data
            });
        } catch (error) {
            return error;
        }
    }

    static async sendForgotPasswordCode(email: string, code: string) {
        try {
            const body = `Hello ${email},
            <p> You requested for a password reset </p>
            <p> Please use this code to continue to reset your password </p>
            <h2> <b> ${code} <b> </h2>
            `;
            const subject = 'Forgot Password';
            return await this.callEmailService({ receiver: email, body, subject, templateKey: 'forgotPassword' });
        } catch (error) {
            return error;
        }
    }

    static async sendResetPasswordConfirmation(email: string) {
        try {
            const body = `Hello ${email},
            <p> your password has be reset succussful </p>
            `;
            const subject = 'Reset password successful';
            return await this.callEmailService({ receiver: email, body, subject, templateKey: 'resetPassword' });
        } catch (error) {
            return error;
        }
    }

    static async callEmailService(data: IEmailBody): Promise<boolean> {
        try {
            const URL = config.server.emailServiceUrl;
            const response = await axios.post(URL, { ...data });
            return response.data;
        } catch (error: any) {
            throw Error(error.message);
        }
    }
}
