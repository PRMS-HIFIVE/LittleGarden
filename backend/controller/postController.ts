import { StatusCodes } from "http-status-codes";
import postService from "../service/postService";
import { Request, Response } from "express";

export const postPosts = async (req:Request, res:Response) : Promise<void> => {
    const userId = req.user?.id;
    const { title, content, plantTag, state, isHealth } = req.body;

    try {
        const newPost = await postService.posts({userId, title, content,state, isHealth});
        if(plantTag) {
            await postService.tags(newPost.insertId,plantTag);
        }
        res.status(StatusCodes.CREATED).json({
            message : "게시글이 성공적으로 작성되었습니다.",
            postData : newPost
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
    const userId = req.user?.id;
    const { plantTag, state } =  req.query;

    try {
        const newPost = await postService.getPosts(Number(state), userId, Number(plantTag));
        const postMap = new Map<number, any>();

        newPost.forEach(post => {
            if (!postMap.has(post.id)) {
                postMap.set(post.id, { ...post, plantTag: [post.plantTag] });
            } else {
                postMap.get(post.id).plantTag.push(post.plantTag);
            }
        });

        const mergedPosts = Array.from(postMap.values());

        res.status(StatusCodes.CREATED).json({
            message : "게시글이 성공적으로 조회되었습니다.",
            data : mergedPosts
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

// 게시글 상세 조회
export const getPostDetail = async (req: Request, res: Response): Promise<void> => {
  const postId = parseInt(req.params.postId);  // 라우터에서 :postId로 받아올 예정

  try {
    const post = await postService.getPostDetail(postId);
    if (!post) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "게시글을 찾을 수 없습니다." });
      return;
    }

    res.status(StatusCodes.OK).json({ message: "게시글 조회 성공", data: post });
    return;
  } catch (error) {
    console.error("Error getting post detail:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "게시글 상세 조회 중 오류가 발생했습니다."
    });
    return;
  }
};


export const updatePosts = async (req:Request, res:Response) : Promise<void> => {
    const userId = req.user?.id;
    const postId = parseInt(req.params.postId);
    const { title, content, plantTag, state,isHealth } = req.body;

    try {
        const updatePost = await postService.updatePosts(postId,{userId, title, content,state,isHealth});
        if(plantTag) {
            await postService.updateTags(postId,plantTag);
        }
        
        res.status(StatusCodes.CREATED).json({
            message : "게시글이 성공적으로 수정되었습니다.",
            data : updatePost
        })
        return;
    } catch (error){
        console.error("Error updating post:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "게시글 수정 중 오류가 발생했습니다.",
            err: error
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
