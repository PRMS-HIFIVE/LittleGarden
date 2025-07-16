import { Request, Response } from 'express';
import webpush from 'web-push';

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