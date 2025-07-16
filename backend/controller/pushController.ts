import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import pushService from "../service/pushService";
import { arrayBufferToBase64Url, isDuplicateSubscription } from '../utils/utils';

export const subscribeDevice = async (req: Request, res: Response) => {
    const { subscription, userId, deviceType, deviceName } = req.body;
    try {
        const result = await pushService.getSubscription(userId);

        if(isDuplicateSubscription(result, subscription.endpoint)) {
            console.log('🚨 이미 구독된 엔드포인트입니다:', subscription.endpoint);
            res.status(409).json({ message: '이미 구독된 엔드포인트입니다.' });
            return;
        };

        const sub = {
            endpoint: subscription.endpoint,
            keys: {
                p256dh: arrayBufferToBase64Url(subscription.getKey('p256dh')),
                auth: arrayBufferToBase64Url(subscription.getKey('auth'))
            }
        }

        await pushService.createSubscription(userId, JSON.stringify(sub), deviceType, deviceName);
        res.status(201).json({ message: '구독 정보 저장 성공' });
    } catch (error: any) {
        console.error('❌ 구독 정보 저장 실패:', error);
        res.status(error.statusCode || 500).json({ error: error.message || '구독 정보 저장 실패' });
        return;
    }
};

export const getSubscriptions = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;
    try {
        const result = await pushService.getSubscription(userId);
        res.status(StatusCodes.OK).json(result);
        return;
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "구독 정보 조회 중 오류가 발생했습니다." });
        return;
    }
};

export const updateSubscription = async (req: Request, res: Response): Promise<void> => {
    const subId = Number(req.params.subId);
    const {isEnabled, deviceName} = req.body;
    try {
        if(deviceName) {
            await pushService.updateSubscriptionName(subId, deviceName);
        } else {
            await pushService.updateSubscriptionStatus(subId, isEnabled);
        }

        res.status(StatusCodes.OK).json({ message: "단말 상태가 변경되었습니다." });
        return;
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "구독 상태 변경 중 오류가 발생했습니다." });
    }
};

export const deleteSubscription = async (req: Request, res: Response): Promise<void> => {
    const subId = Number(req.params.subId);
    try {
        await pushService.deleteSubscription(subId);
        res.status(StatusCodes.OK).json({ message: "구독 정보가 삭제되었습니다." });
        return;
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "구독 정보 삭제 중 오류가 발생했습니다." });
        return;
    }
}