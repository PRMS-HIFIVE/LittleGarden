import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticateToken = (req : Request, res : Response, next : NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "인증 토큰이 없습니다." });
        return;
    }

    try {
        if(process.env.JWT_SECRET) {
            const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
            // req.user = decoded;
        } else {
            throw new Error("JWT_SECRET 환경 변수가 설정되지 않았습니다.");
        }
        
        next();
    } catch (error) {
        console.log("토큰 에러", error)
        res.status(StatusCodes.NOT_ACCEPTABLE).json({ message: "유효하지 않은 토큰입니다." });
        return;
    }
};