import { executeQuery } from "../utils/executeQuery";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const getSubscription = async (userId : number) => {
    const sql = `SELECT * FROM push_subscriptions WHERE user_id = ?`;
    const values = [userId];
    return await executeQuery<RowDataPacket[]>(sql, values);
};

const createSubscription = async (userId: number, subscription: string, deviceType: string, deviceName: string) => {
    const sql = `INSERT INTO push_subscriptions (user_id, subscription, device_type, device_name, is_enabled) VALUES (?, ?, ?, ?, ?)`;
    const values = [userId, subscription, deviceType, deviceName, 1];
    return await executeQuery<ResultSetHeader>(sql, values);
};

export const updateSubscriptionStatus = async (id: number, isEnabled: boolean) => {
    const sql = `UPDATE push_subscriptions SET is_enabled = ? WHERE id = ?`;
    const values = [isEnabled, id];
    return await executeQuery<ResultSetHeader>(sql, values);
};

export const updateSubscriptionName = async (id: number, deviceName: string) => {
    const sql = `UPDATE push_subscriptions SET device_name = ? WHERE id = ?`;
    const values = [deviceName, id];
    return await executeQuery<ResultSetHeader>(sql, values);
};

export const deleteSubscription = async (id: number) => {
    const sql = `DELETE FROM push_subscriptions WHERE id = ?`;
    const values = [id];
    return await executeQuery<ResultSetHeader>(sql, values);
};

const pushService = {
    getSubscription,
    createSubscription,
    updateSubscriptionStatus,
    updateSubscriptionName,
    deleteSubscription
};

export default pushService;