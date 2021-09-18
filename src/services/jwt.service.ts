import jwt from 'jsonwebtoken';
import config from '../../config';

interface IDecodedToken {
    email: string;
}

export class JWTService {
    static async generateToken(payload: { [key: string]: any }): Promise<string> {
        const secret = config.server.jwtSecret;
        return jwt.sign(payload, secret, { expiresIn: '30d' });
    }

    static async decodeToken(token: string): Promise<IDecodedToken | object | string> {
        try {
            const secret = config.server.jwtSecret;
            return jwt.verify(token, secret);
        } catch (error: any) {
            return new Error(error);
        }
    }
}
