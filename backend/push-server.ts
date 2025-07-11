import express, { Request, Response } from 'express';
import webpush from 'web-push';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PUSH_SERVER_PORT || 5001;

app.use(cors({
    origin: process.env.FRONT_SERVER_URL || "http://localhost:5173",
    credentials: true,
}));

app.use(express.json()); 

// VAPID 키 설정 
const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;
const VAPID_EMAIL = process.env.EMAIL_USER || "";

if (!publicVapidKey || !privateVapidKey) {
  console.error("🚨 VAPID_PUBLIC_KEY 또는 VAPID_PRIVATE_KEY가 .env 파일에 설정되지 않았습니다.");
  // VAPID 키를 생성 : 'npx web-push generate-vapid-keys' (서버 컴퓨터에서 재시도 필요)
  process.exit(1); 
}

webpush.setVapidDetails(`mailto:${VAPID_EMAIL}`, publicVapidKey, privateVapidKey);

import pushRouter from './router/push';
app.use("/", pushRouter);

app.listen(PORT, () => {
    console.log(`🚀 PWS 포트 :${PORT}`);
});