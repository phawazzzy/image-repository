import { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from "express";
import joi from 'joi';

export const authValidationSchema = joi.object({
    email: joi.string().trim().email({ minDomainSegments: 2 }).label('email').required(),
    password: joi
        .string()
        .trim()
        .min(2)
        .label('password')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*;])(?=.{8,})/, 'Password not strong [1 Capital letter, 1 Number, 1 speciail character]')
        .required()
});

export const authValidationMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    const validationValue = authValidationSchema.validate(req.body, {
        abortEarly: false,
        allowUnknown: true,
        convert: false,
        skipFunctions: true
    });
    if (validationValue.error) {
        const errorMessages = validationValue.error.details.map((error:any) => error.message);

        return res.status(422).json({ error: errorMessages });
    }

    return next();
}; 