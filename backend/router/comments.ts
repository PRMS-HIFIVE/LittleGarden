import express from 'express';
// import { userValidator } from '../middleware/validator';
import { authenticateToken } from '../middleware/authMiddleware';
import { createComment, deleteComment, getComments, updateComment } from '../controller/commentController';

const router = express.Router();

router.route('/')
    .get(getComments)
    .post(createComment)

router.route('/:commentId')
    .put(updateComment)
    .delete(deleteComment)

export default router;