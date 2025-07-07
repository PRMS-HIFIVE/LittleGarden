import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { MailSendResult } from '../types/types';
dotenv.config();

export const mailSend = async (to : string, subject : string, text : string, html : string) : Promise<MailSendResult> => {
    try {
        if (!to) throw new Error('받는 사람 이메일 주소는 필수');
        if (!text && !html) throw new Error('text, html 둘 중 하나는 필수');

        const transporter = nodemailer.createTransport({
            host : "smtp.naver.com",
            port : 587,
            secure : false,
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to, 
            subject: subject,
            text: text, 
            html: html
        };

        const result = await transporter.sendMail(mailOptions);

        return {
            success : true,
            message : '메일이 성공적으로 전송되었습니다.',
            result: result
        };
    } catch (err) {
        return {
            success : false,
            message : `메일 전송에 실패했습니다.`,
            result : err instanceof Error ? err.message : '알 수 없는 오류'
        }
    }
}