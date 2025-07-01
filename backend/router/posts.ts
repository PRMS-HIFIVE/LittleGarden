import express from "express";
import {
    postPosts,
    getPosts,
    updatePosts,
    deletePosts
    } from '../controller/postController';
import { authenticateToken } from "../middleware/authMiddleware";
import { deletePostValidator, postPostsValidator, updatePostValidator } from "../middleware/validator";

const router = express.Router();

router.route('/')
    .post(authenticateToken, postPostsValidator, postPosts)
    .get(authenticateToken, getPosts)

router.route('/:postId')
    .put(authenticateToken, updatePostValidator, updatePosts)
    .delete(authenticateToken, deletePostValidator, deletePosts);


export default router;