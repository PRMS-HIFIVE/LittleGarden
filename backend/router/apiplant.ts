import express from 'express';
import { Request, Response } from "express";
import fs from 'fs';
import fetch from 'node-fetch';

import path from 'path';

const router = express.Router();

const plandId = async (req:Request, res:Response) : Promise<void> => {
    const API_KEY = 'G8WIcijbNwcc6CfnU12TSLujG2au7DKJSBrOCo9YPxFR19zhxb';
    const API_HEALTH_URL = 'https://api.plant.id/v3/health_assessment';


    const imagePath1 = path.join(__dirname, '../img/보라꽃.jpg');
    const imagePath2 = path.join(__dirname, '../img/주황꽃.jpg');
    const imagePath3 = path.join(__dirname, '../img/흰꽃.jpg');

    const health_assessment = async () => {
        const imageBuffer = fs.readFileSync(imagePath3);
        const base64Image = imageBuffer.toString('base64');
        const detail = "?details=local_name"

        const requestBody = {
            images: [base64Image],
            latitude: 35.95,
            longitude: 128.25
        };

        const response = await fetch(API_HEALTH_URL
                                +detail
                                +"&language=ko", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Api-Key': API_KEY,
            },
            body: JSON.stringify(requestBody),
        });

        const text = await response.text();

        if (!response.ok) {
            console.error('API 오류:', response.status, text);
            throw new Error(`API 요청 실패: ${text}`);
        }

        const result = JSON.parse(text);
        return result;
    };

    const API_IDENTIFY_URL = 'https://api.plant.id/v3/identification';

    const identifyPlant = async () => {
        const imageBuffer = fs.readFileSync(imagePath3);
        const base64Image = imageBuffer.toString('base64');

        const detail = "?details=common_names,watering,best_watering"
        //detail뒤에 ,쓰고 추가하면됨(띄어쓰기하면 인식안되요...)
        const requestBody = {
            images: [base64Image],
            latitude: 35.95,
            longitude: 128.25
        };


        const response = await fetch(API_IDENTIFY_URL
                                    + "?language=ko"
            , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Api-Key': API_KEY,
            },
            body: JSON.stringify(requestBody),
        });

        const text = await response.text();

        if (!response.ok) {
            console.error('API 오류:', response.status, text);
            throw new Error(`API 요청 실패: ${text}`);
        }

        const result = JSON.parse(text);
        return result;
    };


    try {
        const result = await health_assessment();
        console.log(result);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '식물 분석 중 오류 발생' });
    }
}

router.post('/', plandId);

export default router;