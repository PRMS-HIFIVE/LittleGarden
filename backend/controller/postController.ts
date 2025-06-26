import { post } from '../types/types';
import { StatusCodes } from "http-status-codes";
import postService from "../service/postService";
import { Request, Response } from "express";

const postPosts = async (req:Request, res:Response) => {
    const { userId, title, content, plantTag } = req.body;
    if (!userId || !title || !content || !plantTag) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: " 모든 데이터를 입력해주세요. 데이터 누락"
        })
    }

    const cleanedTags = plantTag.map((tag:string) => tag.replace(/^#/, ''));

    try {
        const newPost = await postService.posts({userId, title, content});
        const newtag = await postService.tags(newPost.insertId,cleanedTags);
        return res.status(StatusCodes.CREATED).json({
            message : "게시글이 성공적으로 작성되었습니다.",
            postData : newPost,
            tagData : newtag
        })
    } catch (error){
        console.error("Error creating post:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "게시글 작성 중 오류가 발생했습니다."
        });
    }
};

const getPosts = async (req:Request, res:Response) => {
    const { plantTag } =  req.body?req.body:0;
    try {
        const newPost = await postService.getPosts(plantTag);
        return res.status(StatusCodes.CREATED).json({
            message : "게시글이 성공적으로 조회되었습니다.",
            data : newPost
        })
    } catch (error){
        console.error("Error getting post:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "게시글 조회 중 오류가 발생했습니다."
        });
    }
};

const updatePosts = async (req:Request, res:Response) => {
    const { postId , userId, title, content, plantTag } = req.body;
    if (!userId || !title || !content || !plantTag) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: " 모든 데이터를 입력해주세요. 데이터 누락"
        })
    }
    
    const cleanedTags = plantTag.map((tag:string) => tag.replace(/^#/, ''));

    try {
        const updatePost = await postService.updatePosts(postId,{userId, title, content});
        const updateTag = await postService.updateTags(postId,cleanedTags);
        return res.status(StatusCodes.CREATED).json({
            message : "게시글이 성공적으로 수정되었습니다.",
            data : updatePost
        })
    } catch (error){
        console.error("Error updating post:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "게시글 수정 중 오류가 발생했습니다."
        });
    }
};

const deletePosts = async (req:Request, res:Response) => {
    const { userId, postId } = req.body;
    if (!userId || !postId) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: " 모든 데이터를 입력해주세요. 데이터 누락"
        })
    }

    try {
        const newPost = await postService.deletePosts(postId);
        return res.status(StatusCodes.CREATED).json({
            message : "게시글이 성공적으로 삭제되었습니다.",
            data : newPost
        })
    } catch (error){
        console.error("Error delete post:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "게시글 삭제 중 오류가 발생했습니다."
        });
    }
};

module.exports = {
    postPosts,
    getPosts,
    updatePosts,
    deletePosts
}