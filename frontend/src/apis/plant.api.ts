import * as xmljs from "xml-js";

// ==================================
// Type Definitions
// ==================================

/** Plant.id API - 식물 식별 제안 */
export interface PlantIdSuggestion {
    id: string;
    name: string;
    probability: number;
    details: {
        language: string;
        entity_id: string;
    };
}

/** Plant.id API - 식별 결과 응답 */
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
  // 기타 응답 필드들
}

/** CDATA 또는 일반 텍스트를 포함할 수 있는 타입 */
interface CDataOrText {
    _text?: string;
    _cdata?: string;
}

/** 농사로 API - 식물 목록의 개별 아이템 */
export interface NongsaroListItem {
    cntntsNo: CDataOrText;
    cntntsSj: CDataOrText;
    rtnThumbFileUrl: CDataOrText;
}

/** 농사로 API - 식물 목록 조회 응답 (JSON 변환 후) */
export interface NongsaroListResponse {
    response: {
        header: {
            resultCode: { _text: string };
            resultMsg: { _text: string };
        };
        body: {
            items: {
                item: NongsaroListItem[] | NongsaroListItem; // 결과가 하나일 경우 객체로 올 수 있음
            };
        };
    };
}

/** 농사로 API - 식물 상세 정보 (JSON 변환 후) */
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
    watercycleSprngCodeNm: CDataOrText; // 물주기 (봄)
    watercycleSummerCodeNm: CDataOrText; // 물주기 (여름)
    watercycleAutumnCodeNm: CDataOrText; // 물주기 (가을)
    watercycleWinterCodeNm: CDataOrText; // 물주기 (겨울)
    frtlzrInfo: CDataOrText; // 비료 정보
    // 기타 필요한 상세 정보 필드
}

/** 농사로 API - 식물 상세 조회 응답 (JSON 변환 후) */
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

// ==================================
// API Functions
// ==================================

/**
 * 개발 환경에서 Plant.id API 호출을 모의(mock)합니다.
 * 실제 API 크레딧을 소모하지 않고 테스트할 수 있습니다.
 */
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
        }, 1000); // 1초 지연으로 실제 네트워크 환경처럼 시뮬레이션
    });
};

export const identifyPlantByImage = async (imageBase64: string): Promise<PlantIdResponse> => {
    // 개발 환경이고, VITE_USE_MOCK_API 환경 변수가 'true'일 때 모의 함수를 사용합니다.
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
