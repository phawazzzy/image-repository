import { Request, Response } from 'express';
import config from '../../config';
import logging from '../../config/logging';
// import { AuthService } from '../services/auth.service';
import { JWTService } from '../services/jwt.service';

export function authenticate(options: any) {
    return (_: any, __: PropertyKey, descriptor: TypedPropertyDescriptor<any>) => {
        const originalFunc = descriptor.value;

        descriptor.value = function () {
            const req: Request = arguments[0];
            const res: Response = arguments[1];
            let userId = '';
            const responseObject = {
                error: 'Unauthorized',
                status: 401
            };
            try {
                const authorizationHeaders = req.headers.authorization;
                const headerSplit = authorizationHeaders!.split('Bearer');
                if (headerSplit.length === 2) {
                    return new Promise(async (resolve, _) => {
                        // AuthService.callAuthService({ url: `${config.server.authService}/api/verify-jwt`, token: headerSplit[1] })
                        await JWTService.decodeToken(headerSplit[1].trim())
                            .then((resp) => {
                                console.log(resp);
                                userId = (<any>resp).userId;
                                req.body.userId = userId;
                                // try {
                                //     req.body.firstName = (<any>resp).firstName || '';
                                // } catch (error) {}
                                if (!userId) return resolve(res.status(401).json(responseObject));
                                return resolve(originalFunc.apply(this, [req, res]));
                            })
                            .catch((_) => {
                                return resolve(res.status(401).json(responseObject));
                            });
                    });
                }
            } catch (error) {
                console.log(error);
            }
            return res.status(401).json(responseObject);
        };
        return descriptor;
    };
}
