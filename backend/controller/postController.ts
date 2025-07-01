import { post } from '../types/types';
import { StatusCodes } from "http-status-codes";
import postService from "../service/postService";
import { Request, Response } from "express";

export const postPosts = async (req:Request, res:Response) : Promise<void> => {
    const userId = req.user?.id;
    const { title, content, plantTag } = req.body;

    const cleanedTags = plantTag.map((tag:string) => tag.replace(/^#/, ''));

    try {
        const newPost = await postService.posts({userId, title, content});
        const newtag = await postService.tags(newPost.insertId,cleanedTags);
        res.status(StatusCodes.CREATED).json({
            message : "게시글이 성공적으로 작성되었습니다.",
            postData : newPost,
            tagData : newtag
        });
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
    const { plantTag } =  req.body?req.body:0;
    try {
        const newPost = await postService.getPosts(plantTag);
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
    const userId = req.user?.id;
    const postId = parseInt(req.params.postId);
    const { title, content, plantTag } = req.body;

    const cleanedTags = plantTag.map((tag:string) => tag.replace(/^#/, ''));

    try {
        const updatePost = await postService.updatePosts(postId,{userId, title, content});
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
    const postId = parseInt(req.params.postId);

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
