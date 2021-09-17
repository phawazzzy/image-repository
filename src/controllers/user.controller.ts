import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import TYPES from '../../config/types';
import { httpResponse } from '../helpers/httpResponse.helpers';
import { UserService } from '../services/user.service';

@controller('/api/v1/users')
export class UserControllers {
    constructor(@inject(TYPES.UserService) private userService: UserService) {}

    @httpPost('/signup')
    async userSignup(req: Request, res: Response) {
        const result = await this.userService.userSignup(req.body);
        return httpResponse(res, result);
    }
}
