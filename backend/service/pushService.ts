import { executeQuery } from "../utils/executeQuery";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const subscribe = async (userId : number) => {
    const sql = `SELECT P.subscription 
                    FROM users U LEFT JOIN push_subscriptions P ON U.id = P.user_id
                    WHERE U.id = ?`;
    const values = [userId];
    return await executeQuery<RowDataPacket[]>(sql, values);
};

const saveSubscription = async (userId: number, subscription: string, deviceType: string, deviceName: string) => {
    const sql = `INSERT INTO push_subscriptions (user_id, subscription, device_type, device_name, is_enabled) VALUES (?, ?, ?, ?, ?)`;
    const values = [userId, subscription, deviceType, deviceName, 1];
    return await executeQuery<ResultSetHeader>(sql, values);
};

const pushService = {
    subscribe,
    saveSubscription,
};

export default pushService;