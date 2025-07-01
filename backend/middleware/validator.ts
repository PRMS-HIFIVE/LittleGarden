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

export const updateNickNameValidator : (ValidationChain | RequestHandler)[] = [
    body("nickName").notEmpty().withMessage("변경할 닉네임은 필수 입력 항목입니다."),
    handleValidation
];

export const postPostsValidator : (ValidationChain | RequestHandler)[] = [
    body("title").notEmpty().withMessage("제목은 필수 입력 항목입니다."),
    body("content").notEmpty().withMessage("내용은 필수 입력 항목입니다."),
    body("plantTag").notEmpty().withMessage("태그는 필수 입력 항목입니다."),
    handleValidation
];

export const updatePostValidator : (ValidationChain | RequestHandler)[] = [
    param("postId").notEmpty().withMessage("게시글 id는 필수 입력 항목입니다."),
    body("title").notEmpty().withMessage("제목은 필수 입력 항목입니다."),
    body("content").notEmpty().withMessage("내용은 필수 입력 항목입니다."),
    body("plantTag").notEmpty().withMessage("태그는 필수 입력 항목입니다."),
    handleValidation
];

export const deletePostValidator : (ValidationChain | RequestHandler)[] = [
    param("postId").notEmpty().withMessage("게시글 id는 필수 입력 항목입니다."),
    handleValidation
];

export const createPlantValidator = [
    body("cntntsNo").notEmpty().withMessage("cntntsNo는 필수 입력 항목입니다."),
    body("cntntsSj").notEmpty().withMessage("cntntsSj는 필수 입력 항목입니다."),
    body("dlthtsCodeNm").notEmpty().withMessage("dlthtsCodeNm는 필수 입력 항목입니다."),
    body("fmlCodeNm").notEmpty().withMessage("fmlCodeNm는 필수 입력 항목입니다."),
    body("fmldeSeasonCodeNm").notEmpty().withMessage("fmldeSeasonCodeNm는 필수 입력 항목입니다."),
    body("frtlzrInfo").notEmpty().withMessage("frtlzrInfo는 필수 입력 항목입니다."),
    body("growthAraInfo").notEmpty().withMessage("growthAraInfo는 필수 입력 항목입니다."),
    body("growthHgInfo").notEmpty().withMessage("growthHgInfo는 필수 입력 항목입니다."),
    body("grwhTpCodeNm").notEmpty().withMessage("grwhTpCodeNm는 필수 입력 항목입니다."),
    body("grwtveCodeNm").notEmpty().withMessage("grwtveCodeNm는 필수 입력 항목입니다."),
    body("hdCodeNm").notEmpty().withMessage("hdCodeNm는 필수 입력 항목입니다."),
    body("ignSeasonCodeNm").notEmpty().withMessage("ignSeasonCodeNm는 필수 입력 항목입니다."),
    body("lighttdemanddoCodeNm").notEmpty().withMessage("lighttdemanddoCodeNm는 필수 입력 항목입니다."),
    body("managedemanddoCodeNm").notEmpty().withMessage("managedemanddoCodeNm는 필수 입력 항목입니다."),
    body("managelevelCodeNm").notEmpty().withMessage("managelevelCodeNm는 필수 입력 항목입니다."),
    body("postngplaceCodeNm").notEmpty().withMessage("postngplaceCodeNm는 필수 입력 항목입니다."),
    body("winterLwetTpCodeNm").notEmpty().withMessage("winterLwetTpCodeNm는 필수 입력 항목입니다."),
    body("watercycleSprngCode").notEmpty().withMessage("watercycleSprngCode는 필수 입력 항목입니다."),
    body("watercycleSummerCode").notEmpty().withMessage("watercycleSummerCode는 필수 입력 항목입니다."),
    body("watercycleAutumnCode").notEmpty().withMessage("watercycleAutumnCode는 필수 입력 항목입니다."),
    body("watercycleWinterCode").notEmpty().withMessage("watercycleWinterCode는 필수 입력 항목입니다."),
    handleValidation
];

export const updatePlantValidator : (ValidationChain | RequestHandler)[] = [
    param("plantId").notEmpty().withMessage("게시글 id는 필수 입력 항목입니다."),
    body().custom(body => {
        if (body.nickName === undefined && body.watering === undefined) {
            throw new Error('nickName 또는 watering 중 하나는 필수입니다.');
        }
        return true;
    }),
    handleValidation
];

export const deletePlantValidator : (ValidationChain | RequestHandler)[] = [
    param("plantId").notEmpty().withMessage("게시글 id는 필수 입력 항목입니다."),
    handleValidation
];

export const getCommentsValidator : (ValidationChain | RequestHandler)[] = [
    query("postId").notEmpty().withMessage("게시글 id는 필수 입력 항목입니다."),
    handleValidation
];

export const createCommentValidator : (ValidationChain | RequestHandler)[] = [
    body("postId").notEmpty().withMessage("게시글 id는 필수 입력 항목입니다."),
    body("content").notEmpty().withMessage("게시글 내용은 필수 입력 항목입니다."),
    handleValidation
];

export const updateCommnetValidator : (ValidationChain | RequestHandler)[] = [
    param("commentId").notEmpty().withMessage("댓글 id는 필수 입력 항목입니다."),
    body("content").notEmpty().withMessage("댓글 내용은 필수 입력 항목입니다."),
    handleValidation
];

export const deleteCommentValidator : (ValidationChain | RequestHandler)[] = [
    param("commentId").notEmpty().withMessage("댓글 id는 필수 입력 항목입니다."),
    handleValidation
];