import crypto from "crypto";
import { executeQuery } from "../utils/executeQuery";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { mailSend } from "../utils/mailer";

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

const requestResetPassword = async (email : string, userId : number) => {
    const tempPassword = crypto.randomBytes(4).toString('hex'); // 8자리 임시 비밀번호 생성
    await updatePassword(tempPassword, userId);
    const result = await mailSend(email, "[LittleGarden] 임시 비밀번호 발급", `임시 비밀번호는 ${tempPassword} 입니다.`, "");

    if (result.success) {
        return;
    } else {
        console.log(result.result)
        throw new Error(result.message || "임시 비밀번호 메일 전송 실패");
    }
}

const updatePassword = async (pwd : string, userId : number) => {
    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(pwd, salt, 10000, 10, 'sha512').toString('base64');

    const sql = `UPDATE users SET password = ?, salt = ? WHERE id = ?`;
    const values = [hashPassword, salt, userId];
    return await executeQuery<ResultSetHeader>(sql, values);
}

const emailCertify = async (email : string) => {
    const certCode = crypto.randomBytes(3).toString('hex'); // 6자리 인증 코드 생성
    const result = await mailSend(email, "[LittleGarden] 이메일 인증", `인증 코드는 ${certCode} 입니다.`, "");

    if (result.success) {
        return certCode;
    } else {
        console.log(result.result)
        throw new Error(result.message || "임시 비밀번호 메일 전송 실패");
    }
}

const userService = {
    joinUser,
    findUserByLoginId,
    updateNickName,
    requestResetPassword,
    updatePassword,
    emailCertify
};

export default userService;