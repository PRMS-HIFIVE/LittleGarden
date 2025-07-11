import schedule from 'node-schedule';
import { executeQuery } from '../utils/executeQuery';
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { getWatercycleColumn } from '../utils/utils';
import fetch from 'node-fetch';

const PUSH_SERVER_URL = `http://push-server:${process.env.PUSH_SERVER_PORT}` || 'http://localhost:5001';

const job = schedule.scheduleJob('0 0 2 * * *', async () => {
    try {
        console.log('🌱 매일 오전 11시에 물주기 알림 작업 시작');
        const usersToNotify = await getTargetUsers();
        /* 테스트코드 - 추후 삭제
        const usersToNotify = [
            {
                user_id: 5,
                cntntsSj: "몬스테라",
                subscription: JSON.stringify({
                    endpoint: "https://fcm.googleapis.com/fcm/send/daj4L4yBIFU:APA91bGjFYOIbkJEpUULrpPZvSxyAuSGTgIqvZjVMO7rbfu4hm00XmJi3rHQjIdHzEtxYCWZIkI36MJm4tagP63rKHdh8eFHBmiQL-ENKr5uRmenUgRgpKeVYNf6LLk-Fs_YDzh72cS_",
                    keys: {
                        p256dh: "BIBGGRhNYraEXLoR5FusOiGd2uTkXc1HytDeXg4STHtX5ZhY88JDxOlgcx4ETNn4thetFeeMCyDwpoJ8mt5h9VU",
                        auth: "MNVOCEx1MLcjFDar6Gg-jg"
                    }
                })
            },
            {
                user_id: 8,
                cntntsSj: "스투키",
                subscription: JSON.stringify({
                    endpoint: "https://fcm.googleapis.com/fcm/send/daj4L4yBIFU:APA91bGjFYOIbkJEpUULrpPZvSxyAuSGTgIqvZjVMO7rbfu4hm00XmJi3rHQjIdHzEtxYCWZIkI36MJm4tagP63rKHdh8eFHBmiQL-ENKr5uRmenUgRgpKeVYNf6LLk-Fs_YDzh72cS_",
                    keys: {
                        p256dh: "BIBGGRhNYraEXLoR5FusOiGd2uTkXc1HytDeXg4STHtX5ZhY88JDxOlgcx4ETNn4thetFeeMCyDwpoJ8mt5h9VU",
                        auth: "MNVOCEx1MLcjFDar6Gg-jg"
                    }
                })
            }
        ];
        */

        if (usersToNotify.length === 0) {
            return;
        }

        for (const user of usersToNotify) {
            try {
                const notificationPayload = {
                    title: `[LittleGarden] 물 줄 시간이에요!`,
                    body: `${user.cntntsSj}에게 물을 줄 때가 됐어요. 잊지 마세요!`,
                    icon: `${PUSH_SERVER_URL}/img/Logo.svg`, 
                    data : {
                        userId : user.user_id,
                        subscription : user.subscription,
                    }
                };

                const response = await fetch(`${PUSH_SERVER_URL}/send-notification`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(notificationPayload),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`알림 전송 중 에러 발생 - code : ${response.status}, message : ${errorText}`);
                }

                console.log(`✅ ${user.cntntsSj} 알림 발송 성공!`);
            } catch (error: any) {
                console.error(`❌ ${user.cntntsSj} 알림 발송 실패:`, error.message);
            }
        }
    } catch (err) {
        console.error('DB 조회 중 오류 발생:', err);
    }
});

const getTargetUsers = async () => {
    const currentMonth = new Date().getMonth() + 1;
    const watercycleColumn = getWatercycleColumn(currentMonth);

    const sql = `SELECT P.user_id, P.cntntsSj, PS.subscription
                FROM (plants P JOIN push_subscriptions PS ON P.user_id = PS.user_id)
                LEFT JOIN watercycle W ON P.${watercycleColumn} = W.watercycleCode 
                WHERE PS.is_enabled = 1 
                AND (last_watering IS NULL OR DATE(last_watering) <= DATE_SUB(DATE(NOW()), INTERVAL W.day DAY))`;
    return await executeQuery<RowDataPacket[]>(sql, []);
}