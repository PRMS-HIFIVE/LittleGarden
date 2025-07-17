import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import crypto from "crypto";
import userService from "../service/userService";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { TypedRequest } from '../types/types';
dotenv.config();

interface IUserRequestBody {
    email: string;
    pwd: string;
    nickName?: string
}

export const join = async (req: TypedRequest<IUserRequestBody>, res: Response) : Promise<void> => {
    const {email, pwd, nickName} = req.body;
    
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

        
        const token = jwt.sign(
            { 
                id: loginUser[0].id, 
                email: loginUser[0].email
            }, 
            JWT_SECRET!,
            {
                expiresIn : "3h"
            } 
        );

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 3000
        });

        res.status(StatusCodes.OK).json({
            loginUser : loginUser[0]
        });
        return;

    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." });
        return;
    }
}

export const logout = (req: Request, res: Response) : void => {
    res.clearCookie('access_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    });

    res.json({ message: '로그아웃되었습니다.' });
    return;
}

export const emailCertify = async (req: Request, res: Response): Promise<void> => {
    const {email} = req.body;
    try {
        const user = await userService.findUserByLoginId(email);
        if (user[0]) {
            res.status(StatusCodes.CONFLICT).json({ message : "이미 가입된 이메일입니다." });
            return;
        }

        const certCode = await userService.emailCertify(email);
        res.status(StatusCodes.OK).json({ message: "인증 코드가 이메일로 전송되었습니다.", certCode });
        return;
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." });
        return;
    }
}

export const updateNickName = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const {nickName} = req.body;
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

export const requestResetPassword = async (req: Request, res: Response): Promise<void> => {
    const {email} = req.body;

    try {
        const user = await userService.findUserByLoginId(email);
        if (!user[0]) {
            res.status(StatusCodes.NOT_FOUND).json({ message : "해당 이메일로 가입된 사용자가 없습니다." });
            return;
        }

        await userService.requestResetPassword(user[0].email, user[0].id);
        // 토큰 제거 / 로그아웃 처리 할지?
        res.status(StatusCodes.OK).json({ message: "임시 비밀번호가 이메일로 전송되었습니다." });

    } catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." })
        return;
    }
}

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const {newPassword} = req.body;

    try {
        await userService.updatePassword(newPassword, userId);
        res.status(StatusCodes.OK).json({ message : "비밀번호가 성공적으로 변경되었습니다." });
        return;
    } catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." })
        return;
    }
}
