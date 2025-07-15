import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { IPlantData } from './../types/types';

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    throw new Error('env 파일에 API_KEY가 없습니다.');
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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

    try {
        const result = await model.generateContent({
            contents: [
                {
                    role:"",
                    parts: [
                        {
                            text: promptText,
                        },
                    ],
                },
            ],
            safetySettings: [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
            ],
        });

        const response = await result.response;
        const generatedText = response.text();

        if (generatedText) {
            return generatedText;
        } else {
            console.warn('Gemini API response did not contain expected text:', response);
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