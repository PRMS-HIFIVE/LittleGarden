import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { sendPushValidator, subscribeValidator } from '../middleware/validator';
import { sendPushNotification, subscribeDevice } from '../controller/pushController';

const router = express.Router();

router.post('/subscribe', authenticateToken, subscribeValidator, subscribeDevice);
router.post('/send-notification', sendPushValidator, sendPushNotification);

export default router;