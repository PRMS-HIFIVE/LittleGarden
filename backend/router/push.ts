import express from 'express';
import { deleteSubscription, getSubscriptions, subscribeDevice, updateSubscription } from '../controller/pushController';
import { authenticateToken } from '../middleware/authMiddleware';
import { deleteSubscriptionValidator, subscribeValidator, updateSubscriptionValidator } from '../middleware/validator';

const router = express.Router();

router.route('/')
    .get(authenticateToken, getSubscriptions)
    .post(authenticateToken, subscribeValidator, subscribeDevice);

router.route('/:subId')
    .put(authenticateToken, updateSubscriptionValidator, updateSubscription)
    .delete(authenticateToken, deleteSubscriptionValidator, deleteSubscription);

export default router;
