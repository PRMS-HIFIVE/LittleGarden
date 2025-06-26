import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import crypto from "crypto";
import userService from "../service/userService";
import dotenv from "dotenv";
import jwt, { Secret } from "jsonwebtoken";
import { TypedRequest } from '../types/types';
dotenv.config();

interface IUserRequestBody {
    email: string;
    pwd: string;
    nickName?: string
}

export const join = async (req: TypedRequest<IUserRequestBody>, res: Response) : Promise<void> => {
    const {email, pwd, nickName} = req.body;
    console.log("회원가입 요청", email, pwd, nickName);
    
    try {
        const loginUser = await userService.findUserByLoginId(email);

        if(loginUser.length) {
            res.status(StatusCodes.CONFLICT).json({ message : "이미 존재하는 아이디입니다." });
            return;
        }

        if(!nickName) {
            res.status(StatusCodes.BAD_REQUEST).json({ message : "닉네임을 입력해주세요." });
            return;
        } else {
            await userService.joinUser(email, pwd, nickName);
            res.status(StatusCodes.CREATED).json({ message : "성공적으로 회원가입 되었습니다. "})
            return;
        }
    } catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." });
        return;
    }
}

export const login = async (req: TypedRequest<IUserRequestBody>, res: Response) : Promise<void>=> {
    const {email, pwd} = req.body;

    try {
        const loginUser = await userService.findUserByLoginId(email);
        
        if (!loginUser[0]) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message : "아이디 또는 비밀번호를 다시 확인해주세요." })
            return;
        }
        
        const hashPassword = crypto.pbkdf2Sync(pwd, loginUser[0].salt, 10000, 10, 'sha512').toString('base64');
        if (loginUser[0].password !== hashPassword) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "아이디 또는 비밀번호를 다시 확인해주세요." })
            return;
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            console.error("환경 변수 JWT_SECRET 확인");
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "JWT 시크릿이 없습니다." })
            return;
        }

        // TODO : jwt 에러 수정 후 주석 해제
        // const token = jwt.sign(
        //     { 
        //         id: loginUser[0].id, 
        //         email: loginUser[0].email
        //     }, 
        //     JWT_SECRET as Secret,
        //     {
        //         expiresIn: process.env.JWT_EXPIRES_IN || "1h"
        //     } 
        // );

        res.status(StatusCodes.OK).json({
            loginUser : loginUser[0],
            // token : token
        });
        return;

    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." });
        return;
    }
}

export const updateNickName = async (req: Request, res: Response): Promise<void> => {
    const {userId, nickName} = req.body;
    // TODO : req.user 해결되면 auth에서 userId 가져오기
    try {
        await userService.updateNickName(userId, nickName);
        res.status(StatusCodes.OK).json({ message : "닉네임이 변경되었습니다. "});
        return;
    } catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." })
        return;
    }
}