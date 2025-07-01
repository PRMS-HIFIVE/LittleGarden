import express from 'express';
import { updateNickNameValidator, userValidator } from '../middleware/validator';
import { join, login, updateNickName } from '../controller/userController';

const router = express.Router();

router.post('/join', userValidator, join);
router.post('/login', userValidator, login);
router.put('/', updateNickNameValidator, updateNickName);

export default router;