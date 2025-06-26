import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body, param, query, check, validationResult, ValidationError, ValidationChain } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

interface IErrorMessage {
    location?: string; 
    path?: string;
    msg: string; 
}

const handleValidation = (req : Request, res : Response, next : NextFunction) : void => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        const errorMessages : IErrorMessage[] = error.array().map((err : ValidationError) => {
            if (err.type === 'field') {
                return {
                    location: err.location,
                    path: err.path,
                    msg: err.msg,
                };
            } else {
                return {
                    msg: err.msg,
                };
            }
        });

        res.status(StatusCodes.BAD_REQUEST).json({ message: "전달 데이터를 다시 확인해주세요. ", errors: errorMessages });
        return;
    }

    next();
};

export const userValidator : (ValidationChain | RequestHandler)[] = [
    body("email").notEmpty().withMessage("이메일은 필수 입력 항목입니다."),
    body("pwd").notEmpty().withMessage("비밀번호는 필수 입력 항목입니다."),
    handleValidation
];