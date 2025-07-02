import express from 'express';
import { updateNickNameValidator, userValidator } from '../middleware/validator';
import { authenticateToken } from '../middleware/authMiddleware';
import { join, login, updateNickName } from '../controller/userController';
import { likePost, deleteLikePost} from '../controller/likeController';

const router = express.Router();

router.post('/join', userValidator, join);
router.post('/login', userValidator, login);
router.put('/', updateNickNameValidator, updateNickName);

router.route('/:postId')
    .post(authenticateToken, likePost)
    .delete(authenticateToken, deleteLikePost);


export default router;