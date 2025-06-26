import pool from "../db/mariadb";
import crypto from "crypto";
import { IUser } from "../types/types";

const joinUser = async (email : string, pwd : string, nickName : string) => {
    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(pwd, salt, 10000, 10, 'sha512').toString('base64');

    const sql = `INSERT INTO users (email, password, salt, nickname) VALUES (?, ?, ?, ?)`;
    const values = [email, hashPassword, salt, nickName];
    
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, values);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const findUserByLoginId = async (email : string) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, email);
        return results as IUser[];
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const updateNickName = async (userId : number, nickName : string) => {
    const sql = `UPDATE users SET nickName = ? WHERE id = ?`;
    const values = [nickName, userId];
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, values);
        return results;
    } catch (error) {
        throw error;
    } finally {
        connection.release();
    }
};

const userService = {
    joinUser,
    findUserByLoginId,
    updateNickName
};

export default userService;