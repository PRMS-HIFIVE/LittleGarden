import express from 'express';
import { emailValidator, updateNickNameValidator, updatePasswordValidator, userValidator } from '../middleware/validator';
import { authenticateToken } from '../middleware/authMiddleware';
import { join, login, emailCertify, updateNickName, requestResetPassword, resetPassword } from '../controller/userController';
import { likePost, deleteLikePost} from '../controller/likeController';

const router = express.Router();

router.post('/join', userValidator, join);
router.post('/login', userValidator, login);
router.post('/certify', emailValidator, emailCertify)

router.put('/', updateNickNameValidator, updateNickName);

router.route('/reset')
    .post(emailValidator, requestResetPassword)
    .put(authenticateToken, updatePasswordValidator, resetPassword)

router.route('/:postId')
    .post(authenticateToken, likePost)
    .delete(authenticateToken, deleteLikePost);


export default router;