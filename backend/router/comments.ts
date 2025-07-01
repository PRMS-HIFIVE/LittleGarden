import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { createComment, deleteComment, getComments, updateComment } from '../controller/commentController';
import { createCommentValidator, deleteCommentValidator, getCommentsValidator, updateCommnetValidator } from '../middleware/validator';

const router = express.Router();

router.route('/')
    .get(authenticateToken, getCommentsValidator, getComments)
    .post(authenticateToken, createCommentValidator, createComment)

router.route('/:commentId')
    .put(authenticateToken, updateCommnetValidator, updateComment)
    .delete(authenticateToken, deleteCommentValidator, deleteComment)

export default router;