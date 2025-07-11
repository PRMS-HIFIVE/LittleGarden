import { Request, Response } from 'express';
import { arrayBufferToBase64Url, isDuplicateSubscription } from '../utils/utils';
import webpush from 'web-push';
import pushService from '../service/pushService';

export const subscribeDevice = async (req: Request, res: Response) => {
    const { subscription, userId, deviceType, deviceName } = req.body;
    try {
        const result = await pushService.subscribe(userId);

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

        await pushService.saveSubscription(userId, JSON.stringify(sub), deviceType, deviceName);
        res.status(201).json({ message: '구독 정보 저장 성공' });
    } catch (error: any) {
        console.error('❌ 구독 정보 저장 실패:', error);
        res.status(error.statusCode || 500).json({ error: error.message || '구독 정보 저장 실패' });
        return;
    }
};

export const sendPushNotification = async (req: Request, res: Response) => {
    const { title, body, icon, data } = req.body;
    const subscription = typeof data.subscription === 'string'
        ? JSON.parse(data.subscription)
        : data.subscription;

    try {
        const payload = JSON.stringify({ title, body, icon });
        await webpush.sendNotification(subscription, payload);

        console.log('✅ 알림 발송 성공:');
        res.status(200).json({ message: '알림이 발송되었습니다'});
        return;
    } catch (error: any) {
        console.error('❌ 알림 발송 실패:', error);
        res.status(error.statusCode || 500).json({ error: error.message || '알림 발송 실패' });
        return;
    }
};