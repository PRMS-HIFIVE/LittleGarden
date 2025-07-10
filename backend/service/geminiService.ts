import { IPlantData } from './../types/types';
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { executeQuery } from "../utils/executeQuery";


const API_KEY = process.env.GEMINI_API_KEY;

const geminiComment = async (plantData:IPlantData) => {

    let detailsString = `식물 이름: ${plantData.cntntsSj}\n`;
    if (plantData.fmlCodeNm) detailsString += `과명: ${plantData.fmlCodeNm}\n`;
    if (plantData.grwhTpCodeNm) detailsString += `생육 온도: ${plantData.grwhTpCodeNm}\n`;
    if (plantData.hdCodeNm) detailsString += `습도: ${plantData.hdCodeNm}\n`;
    if (plantData.lighttdemanddoCodeNm) detailsString += `광요구도: ${plantData.lighttdemanddoCodeNm}\n`;
    if (plantData.frtlzrInfo) detailsString += `비료: ${plantData.frtlzrInfo}\n`;
    if (plantData.grwtveCodeNm) detailsString += `생장 속도: ${plantData.grwtveCodeNm}\n`;
    if (plantData.managelevelCodeNm) detailsString += `관리 수준: ${plantData.managelevelCodeNm}\n`;
    if (plantData.dlthtsCodeNm) detailsString += `주요 병충해: ${plantData.dlthtsCodeNm}\n`;
    if (plantData.postngplaceCodeNm) detailsString += `추천 배치 장소: ${plantData.postngplaceCodeNm}\n`;
    if (plantData.ignSeasonCodeNm) detailsString += `발화 계절: ${plantData.ignSeasonCodeNm}\n`;
    if (plantData.watercycleNm) detailsString += `물 주기: ${plantData.watercycleNm}\n`;

    const promptText = `당신은 식물 백과사전 전문가입니다. 다음 식물 상세 정보를 바탕으로 이 식물에 대한 특징과 매력을 설명하고 키울때의 팁에 대한 코멘트를 100단어 이내로 작성해 주세요.
                        그리고 물 주기에 맞춰서 며칠마다 물줘야하는지도 알려주세요.
                        ${detailsString}`;

    const requestBodyObject = { 
    contents: [
    {
        parts: [
            {
                text: promptText,
            },
        ],
    },
    ],
    safetySettings: [
        {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE",
        },
        {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_NONE",
        },
        {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE",
        },
        {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE",
        },
        ],
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBodyObject),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log('Gemini API Error Response:', errorData);
            throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();

        const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (generatedText) {
            return generatedText;
        } else {
            console.log('Gemini API response did not contain expected text:', data);
            throw new Error('Failed to extract comment from Gemini API response.');
        }
    } catch (error: any) {
        console.error('Fetch request error to Gemini API:', error);
        throw new Error(`Gemini API 호출 실패: ${error.message}`);
    }
}

const geminiSerivce = {
    geminiComment
};

export default geminiSerivce;