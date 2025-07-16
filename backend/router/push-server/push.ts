import express from 'express';
import { sendPushValidator } from '../../middleware/validator';
import { sendPushNotification } from '../../controller/push-server/pushController';

const router = express.Router();

router.post('/send-notification', sendPushValidator, sendPushNotification);

export default router;