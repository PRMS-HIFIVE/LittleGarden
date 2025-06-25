import { post } from './../common/types';
import { StatusCodes } from "http-status-codes";
import postService from "../service/postService";
import { Request, Response } from "express";

const postPosts = async (req:Request<{},{},post>, res:Response) => {
    const { userId, title, content, tag } = req.body;
    if (!userId || !title || !content || !tag) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: " 모든 데이터를 입력해주세요. 데이터 누락"
        })
    }

    try {
        const newPost = await postService.posts({userId, title, content, tag});
        return res.status(StatusCodes.CREATED).json({
            message : "게시글이 성공적으로 작성되었습니다.",
            data : newPost
        })
    } catch (error){
        console.error("Error creating post:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "게시글 작성 중 오류가 발생했습니다."
        });
    }
};

const getPosts = async (req:Request, res:Response) => {
    // 필터 기능 추가 예정
    try {
        const newPost = await postService.getPosts();
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
    // 어떻게 수정할지 고민중
    // 제목만 수정한다거나 태그만 수정한다거나를 한번에 하고싶어서 고민...
    // 고민 1. 수정할때 원래의 데이터를 호출하고 변경되는 곳만 수정후 전부다 update
    // 고민 2. 그래도 타입스크립트인데 하나씩만 받을수있으려나...?
    const { userId, title, content, tag } = req.body;
    if (!userId || !title || !content || !tag) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: " 모든 데이터를 입력해주세요. 데이터 누락"
        })
    }

    try {
        const newPost = await postService.updateposts({userId, title, content, tag});
        return res.status(StatusCodes.CREATED).json({
            message : "게시글이 성공적으로 수정되었습니다.",
            data : newPost
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