import crypto from "crypto";
import { executeQuery } from "../utils/executeQuery";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const joinUser = async (email : string, pwd : string, nickName : string) => {
    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(pwd, salt, 10000, 10, 'sha512').toString('base64');

    const sql = `INSERT INTO users (email, password, salt, nickname) VALUES (?, ?, ?, ?)`;
    const values = [email, hashPassword, salt, nickName];
    return await executeQuery<ResultSetHeader>(sql, values);
};

const findUserByLoginId = async (email : string) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    const values = [email];
    return await executeQuery<RowDataPacket[]>(sql, values);
};

const updateNickName = async (userId : number, nickName : string) => {
    const sql = `UPDATE users SET nickName = ? WHERE id = ?`;
    const values = [nickName, userId];
    return await executeQuery<ResultSetHeader>(sql, values);
};

const userService = {
    joinUser,
    findUserByLoginId,
    updateNickName
};

export default userService;