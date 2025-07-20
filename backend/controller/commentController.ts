import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import commentService from "../service/commentService";
import { IComment, TypedRequest } from '../types/types';
import noticeService from '../service/noticeService';

type commentRequestBody = Pick<IComment, 'postId' | 'userId' | 'content'>;

export const getComments = async (req: Request, res: Response) : Promise<void> => {
    const userId = req.user?.id;
    const postId = parseInt(req.query.postId as string, 10);

    try {
        const comments = await commentService.getComments(postId, userId);
        res.status(StatusCodes.OK).json(comments);
        return;
    } catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." });
        return;
    }
}

export const createComment = async (req: TypedRequest<commentRequestBody>, res: Response) : Promise<void> => {
    const userId = req.user?.id;
    const {postId, content} = req.body;

    try {
        await commentService.createComment(postId, userId, content);
        await noticeService.CommentAddNotice(postId);
        res.status(StatusCodes.CREATED).json({ message : "댓글이 등록되었습니다."});
        return;
    } catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." });
        return;
    }
}

export const updateComment = async (req: Request, res: Response) : Promise<void> => {
    const {commentId} = req.params;
    const {content} = req.body;
    
    try {
        await commentService.updateComment(commentId, content);
        res.status(StatusCodes.OK).json({ message : "댓글이 수정되었습니다. "});
        return;
    } catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." });
        return;
    }
}

export const deleteComment = async (req: Request, res: Response) : Promise<void> => {
    const {commentId} = req.params;
    
    try {
        await commentService.deleteComment(commentId);
        res.status(StatusCodes.OK).json({ message : "댓글이 삭제되었습니다. "});
        return;
    } catch(err) {
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message : "서버에서 오류가 발생했습니다. 관리자에게 문의해주세요." });
        return;
    }
}