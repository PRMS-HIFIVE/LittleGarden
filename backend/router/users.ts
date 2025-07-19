import express from 'express';
import { emailValidator, updateNickNameValidator, updatePasswordValidator, userJoinValidator, userLoginValidator } from '../middleware/validator';
import { authenticateToken } from '../middleware/authMiddleware';
import { join, login, emailCertify, updateNickName, requestResetPassword, resetPassword, logout, authCheck } from '../controller/userController';
import { likePost, deleteLikePost} from '../controller/likeController';

const router = express.Router();

router.post('/join', userJoinValidator, join);
router.post('/login', userLoginValidator, login);
router.post('/logout', authenticateToken, logout);
router.get('/check', authenticateToken, authCheck);

router.post('/certify', emailValidator, emailCertify)

router.put('/', authenticateToken, updateNickNameValidator, updateNickName);

router.route('/reset')
    .post(emailValidator, requestResetPassword)
    .put(authenticateToken, updatePasswordValidator, resetPassword)

router.route('/:postId')
    .post(authenticateToken, likePost)
    .delete(authenticateToken, deleteLikePost);


export default router;