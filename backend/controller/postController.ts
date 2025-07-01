import { StatusCodes } from "http-status-codes";
import postService from "../service/postService";
import { Request, Response } from "express";

export const postPosts = async (req:Request, res:Response) : Promise<void> => {
    const { userId, title, content, plantTag, state } = req.body;
    if (!userId || !title || !content || !plantTag || !state) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: " 모든 데이터를 입력해주세요. 데이터 누락"
        })
        return;
    }

    const cleanedTags = plantTag.map((tag:string) => tag.replace(/^#/, ''));

    try {
        const newPost = await postService.posts({userId, title, content,state});
        const newtag = await postService.tags(newPost.insertId,cleanedTags);
        res.status(StatusCodes.CREATED).json({
            message : "게시글이 성공적으로 작성되었습니다.",
            postData : newPost,
            tagData : newtag
        })
        return;
    } catch (error){
        console.error("Error creating post:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "게시글 작성 중 오류가 발생했습니다."
        });
        return;
    }
};

export const getPosts = async (req:Request, res:Response) : Promise<void> => {
    const { plantTag, state } =  req.body?req.body:0;

    try {
        const newPost = await postService.getPosts(plantTag,state);
        res.status(StatusCodes.CREATED).json({
            message : "게시글이 성공적으로 조회되었습니다.",
            data : newPost
        })
        return;
    } catch (error){
        console.error("Error getting post:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "게시글 조회 중 오류가 발생했습니다."
        });
        return;
    }
};

export const updatePosts = async (req:Request, res:Response) : Promise<void> => {
    const { postId , userId, title, content, plantTag,state } = req.body;
    if (!userId || !title || !content || !plantTag ||!state) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: " 모든 데이터를 입력해주세요. 데이터 누락"
        })
        return;
    }
    
    const cleanedTags = plantTag.map((tag:string) => tag.replace(/^#/, ''));

    try {
        const updatePost = await postService.updatePosts(postId,{userId, title, content,state});
        const updateTag = await postService.updateTags(postId,cleanedTags);
        res.status(StatusCodes.CREATED).json({
            message : "게시글이 성공적으로 수정되었습니다.",
            data : updatePost
        })
        return;
    } catch (error){
        console.error("Error updating post:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "게시글 수정 중 오류가 발생했습니다."
        });
        return;
    }
};

export const deletePosts = async (req:Request, res:Response) : Promise<void> => {
    const { userId, postId } = req.body;
    if (!userId || !postId) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: " 모든 데이터를 입력해주세요. 데이터 누락"
        })
        return;
    }

    try {
        const newPost = await postService.deletePosts(postId);
        res.status(StatusCodes.CREATED).json({
            message : "게시글이 성공적으로 삭제되었습니다.",
            data : newPost
        })
        return;
    } catch (error){
        console.error("Error delete post:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "게시글 삭제 중 오류가 발생했습니다."
        });
        return;
    }
};
