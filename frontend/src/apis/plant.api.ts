import * as xmljs from "xml-js";
import type { Plant } from "@/store/plantStore";

const BASE_URL = import.meta.env.VITE_BACK_SERVER_URL;

export interface PlantIdSuggestion {
    id: string;
    name: string;
    probability: number;
    details: {
        language: string;
        entity_id: string;
    };
}

export interface PlantIdResponse {
    result: {
        classification: {
            suggestions: PlantIdSuggestion[];
        };
        is_plant: {
            probability: number;
            binary: boolean;
        };
    };
}

export interface CDataOrText {
    _text?: string;
    _cdata?: string;
}

export interface NongsaroListItem {
    cntntsNo: CDataOrText;
    cntntsSj: CDataOrText;
    rtnThumbFileUrl: CDataOrText;
}

export interface NongsaroListResponse {
    response: {
        header: {
            resultCode: { _text: string };
            resultMsg: { _text: string };
        };
        body: {
            items: {
                item: NongsaroListItem[] | NongsaroListItem;
            };
        };
    };
}

export interface NongsaroDetailItem {
    cntntsNo: CDataOrText; // 컨텐츠 번호
    fmlCodeNm: CDataOrText; // 과명
    plntbneNm: CDataOrText; // 학명
    plntzrNm: CDataOrText; // 유통명
    ignSeasonCodeNm: CDataOrText; // 발화 계절
    dlthtsCodeNm: CDataOrText; // 병충해
    grwhTpCodeNm: CDataOrText; // 생육 온도
    winterLwetTpCodeNm: CDataOrText; // 겨울 최저 온도
    hdCodeNm: CDataOrText; // 습도
    lighttdemanddoCodeNm: CDataOrText; // 광요구도
    postngplaceCodeNm: CDataOrText; // 배치장소
    watercycleSprngCode: CDataOrText; // 물주기 코드 (봄)
    watercycleSummerCode: CDataOrText; // 물주기 코드 (여름)
    watercycleAutumnCode: CDataOrText; // 물주기 코드 (가을)
    watercycleWinterCode: CDataOrText; // 물주기 코드 (겨울)
    watercycleSprngCodeNm: CDataOrText; // 물주기 (봄)
    watercycleSummerCodeNm: CDataOrText; // 물주기 (여름)
    watercycleAutumnCodeNm: CDataOrText; // 물주기 (가을)
    watercycleWinterCodeNm: CDataOrText; // 물주기 (겨울)
    frtlzrInfo: CDataOrText; // 비료 정보
}

export interface NongsaroDetailResponse {
    response: {
        header: {
            resultCode: { _text: string };
            resultMsg: { _text: string };
        };
        body: {
            item: NongsaroDetailItem;
        };
    };
}

const xmlToJson = <T>(xmlText: string): T => {
    const jsonStr = xmljs.xml2json(xmlText, { compact: true, spaces: 2 });
    return JSON.parse(jsonStr) as T;
};

const getAuthToken = (): string | null => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return token;
};

const mockIdentifyPlantByImage = (): Promise<PlantIdResponse> => {
    console.warn("DEV MODE: Plant.id API is mocked to save credits.");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                result: {
                    classification: {
                        suggestions: [
                            {
                                id: "mock-1",
                                name: "몬스테라", // 농사로 API에서 검색될 만한 이름으로 설정
                                probability: 0.98,
                                details: { language: "ko", entity_id: "mock-1" },
                            },
                        ],
                    },
                    is_plant: { probability: 0.99, binary: true },
                },
            } as PlantIdResponse);
        }, 1000);
    });
};

export const identifyPlantByImage = async (imageBase64: string): Promise<PlantIdResponse> => {
    if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_API === 'true') {
        return mockIdentifyPlantByImage();
    }

    const apiKey = import.meta.env.VITE_PLANT_ID_API_KEY;
    if (!apiKey) throw new Error("Plant.id API 키가 설정되지 않았습니다.");

    const API_URL = "https://api.plant.id/v3/identification?details=common_names&language=ko";

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Api-Key": apiKey,
        },
        body: JSON.stringify({
            images: [imageBase64],
        }),
    });

    if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || "식물 식별에 실패했습니다.");
    }

    return response.json();
};

export const fetchMyPlants = async (): Promise<Plant[]> => {
    const token = getAuthToken();
    if (!token) {
        return [];
    }

    const response = await fetch(`${BASE_URL}/plants`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
    });

    if (!response.ok) throw new Error('내 식물 목록을 불러오는데 실패했습니다.');

    return response.json();
};

export const registerPlant = async (plantData: Record<string, any>) => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("인증 토큰이 없습니다. 다시 로그인해주세요.");
    }

    const response = await fetch(`${BASE_URL}/plants`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(plantData),
    });

    if (!response.ok) {
        const errorResult = await response.json();
        const errorMessage = errorResult.errors
            ? errorResult.errors.map((e: { msg: string }) => e.msg).join("\n")
            : errorResult.message || "식물 등록에 실패했습니다.";
        throw new Error(errorMessage);
    }

    return response.json();
};

export const fetchPlantById = async (plantId: number): Promise<Plant | null> => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("인증 토큰이 없습니다. 다시 로그인해주세요.");
    }

    const urlWithQuery = `${BASE_URL}/plants?plantId=${plantId}`;

    const response = await fetch(urlWithQuery, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
    });

    if (!response.ok) throw new Error('식물 상세 정보를 불러오는데 실패했습니다.');

    const plants: Plant[] = await response.json();

    return plants[0] || null;
};

export const updatePlant = async (plantId: number, data: { nickName?: string; watering?: string }): Promise<void> => {
    const token = getAuthToken();
    if (!token) {
        throw new Error("인증 토큰이 없습니다. 다시 로그인해주세요.");
    }

    const response = await fetch(`${BASE_URL}/plants/${plantId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorResult = await response.json().catch(() => ({ message: '식물 정보 업데이트에 실패했습니다.' }));
        throw new Error(errorResult.message || '식물 정보 업데이트에 실패했습니다.');
    }
};

const NONGSARO_BASE_URL = "/nongsaro-api/service/garden";

export const searchPlantByNameOnNongsaro = async (name: string): Promise<NongsaroListResponse> => {
    const apiKey = import.meta.env.VITE_NONGSARO_API_KEY;
    if (!apiKey) throw new Error("농사로 API 키가 설정되지 않았습니다.");

    const queryParams = new URLSearchParams({
        apiKey: apiKey,
        sType: "sCntntsSj",
        sText: name,
    });

    const response = await fetch(`${NONGSARO_BASE_URL}/gardenList?${queryParams}`);

    if (!response.ok) throw new Error("농사로 식물 목록 조회에 실패했습니다.");

    const xmlText = await response.text();
    const jsonData = xmlToJson<NongsaroListResponse>(xmlText);

    if (jsonData.response.header.resultCode._text !== "00") {
        throw new Error(jsonData.response.header.resultMsg._text || "농사로 식물 목록 조회 중 오류가 발생했습니다.");
    }

    return jsonData;
};

export const getPlantDetailFromNongsaro = async (cntntsNo: string): Promise<NongsaroDetailResponse> => {
    const apiKey = import.meta.env.VITE_NONGSARO_API_KEY;
    if (!apiKey) throw new Error("농사로 API 키가 설정되지 않았습니다.");

    const queryParams = new URLSearchParams({
        apiKey: apiKey,
        cntntsNo: cntntsNo,
    });

    const response = await fetch(`${NONGSARO_BASE_URL}/gardenDtl?${queryParams}`);

    if (!response.ok) throw new Error("농사로 식물 상세 정보 조회에 실패했습니다.");

    const xmlText = await response.text();
    const jsonData = xmlToJson<NongsaroDetailResponse>(xmlText);

    if (jsonData.response.header.resultCode._text !== "00") {
        throw new Error(jsonData.response.header.resultMsg._text || "농사로 식물 상세 정보 조회 중 오류가 발생했습니다.");
    }

    return jsonData;
};
