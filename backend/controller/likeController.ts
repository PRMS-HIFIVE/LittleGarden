import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { TypedRequest } from '../types/types';
import likeService from '../service/likeService';

interface ILikeRequestBody {
    postId : number;
    userId : number;
    Request: Request;
}

export const likePost = async (req:TypedRequest<ILikeRequestBody>, res:Response) : Promise<void> => {
    const { postId } = req.params;
    const { id } = req.user;

    try {
        const results = await likeService.likePost(parseInt(postId), id);
        res.status(StatusCodes.CREATED).json({ 
            message: "성공적으로 좋아요가 등록되었습니다." 
        });
        return;
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요.",
        });
        return;
    }
    };

export const deleteLikePost = async (req:TypedRequest<ILikeRequestBody>, res:Response) : Promise<void> => {
    const { postId } = req.params;
    const { id } = req.user;
    
    try {
        const results = await likeService.deleteLikePost(parseInt(postId), id);
        res.status(StatusCodes.OK).json({ 
            message: "성공적으로 좋아요가 삭제되었습니다." 
        });
        return;
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요.",
        });
        return;
    }
};


