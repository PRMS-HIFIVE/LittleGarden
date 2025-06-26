import express from "express";
import { userValidator } from '../middleware/validator';
import {
    postPosts,
    getPosts,
    updatePosts,
    deletePosts
    } from '../controller/postController';

const router = express.Router();
// 조회를 제외한 API는 헤더에 토큰 추가 예정

router.route("/")
    .post(postPosts)
    .get(getPosts)
    .put(updatePosts)
    .delete(deletePosts);

export default router;