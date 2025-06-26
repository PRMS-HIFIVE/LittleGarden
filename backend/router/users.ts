import express from 'express';
import { userValidator } from '../middleware/validator';
import { join, login, updateNickName } from '../controller/userController';

const router = express.Router();

router.post('/join', userValidator, join);
router.post('/login', userValidator, login);
router.put('/', updateNickName);

export default router;