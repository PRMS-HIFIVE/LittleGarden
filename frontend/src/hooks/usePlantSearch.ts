import { useState, useCallback } from "react";
import {
    searchPlantByNameOnNongsaro,
    getPlantDetailFromNongsaro,
    type PlantIdSuggestion,
    type NongsaroListItem,
    type NongsaroDetailItem,
} from "@/apis/plant.api";

export interface PlantDetail {
    contentNo: string;
    name: string;
    scientificName: string;
    familyName: string;
    floweringSeason: string;
    pests: string;
    growthTemp: string;
    winterMinTemp: string;
    humidity: string;
    lightRequirement: string;
    placement: string;
    watering: {
        spring: string;
        summer: string;
        autumn: string;
        winter: string;
    };
    wateringCode: {
        spring: string;
        summer: string;
        autumn: string;
        winter: string;
    };
    fertilizer: string;
}

interface PlantSearchState {
    data: PlantDetail | null;
    suggestions: PlantIdSuggestion[] | null;
    nongsaroList: NongsaroListItem[] | null;
    isLoading: boolean;
    error: string | null;
}

const getText = (node: { _text?: string; _cdata?: string } | undefined): string => {
    if (!node) return '';
    return (node._text || node._cdata) ?? '';
};

export const usePlantSearch = () => {
    const [state, setState] = useState<PlantSearchState>({
        data: null,
        suggestions: null,
        nongsaroList: null,
        isLoading: false,
        error: null,
    });

    const mapToPlantDetail = useCallback((rawDetail: NongsaroDetailItem): PlantDetail => ({
        contentNo: getText(rawDetail.cntntsNo),
        name: getText(rawDetail.plntzrNm) || getText(rawDetail.plntbneNm), // 유통명이 없으면 학명 사용
        scientificName: getText(rawDetail.plntbneNm),
        familyName: getText(rawDetail.fmlCodeNm),
        floweringSeason: getText(rawDetail.ignSeasonCodeNm),
        pests: getText(rawDetail.dlthtsCodeNm),
        growthTemp: getText(rawDetail.grwhTpCodeNm),
        winterMinTemp: getText(rawDetail.winterLwetTpCodeNm),
        humidity: getText(rawDetail.hdCodeNm),
        lightRequirement: getText(rawDetail.lighttdemanddoCodeNm),
        placement: getText(rawDetail.postngplaceCodeNm),
        watering: {
            spring: getText(rawDetail.watercycleSprngCodeNm),
            summer: getText(rawDetail.watercycleSummerCodeNm),
            autumn: getText(rawDetail.watercycleAutumnCodeNm),
            winter: getText(rawDetail.watercycleWinterCodeNm),
        },
        wateringCode: {
            spring: getText(rawDetail.watercycleSprngCode),
            summer: getText(rawDetail.watercycleSummerCode),
            autumn: getText(rawDetail.watercycleAutumnCode),
            winter: getText(rawDetail.watercycleWinterCode),
        },
        fertilizer: getText(rawDetail.frtlzrInfo),
    }), []);

    const getDetailsByContentNo = useCallback(async (cntntsNo: string) => {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        try {
            const detailResponse = await getPlantDetailFromNongsaro(cntntsNo);
            const finalData = mapToPlantDetail(detailResponse.response.body.item);

            setState((prev) => ({
                ...prev,
                data: finalData,
                isLoading: false,
            }));
        } catch (err) {
            console.log("Error fetching plant details:", err);
            const errorMessage = err instanceof Error ? err.message : "상세 정보를 가져오는데 실패했습니다.";
            setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }));
        }
    }, [mapToPlantDetail]);

    const searchByName = useCallback(async (name: string) => {
        setState({data: null, suggestions:null, nongsaroList: null, isLoading: true, error: null});

        try {
            const listResponse = await searchPlantByNameOnNongsaro(name);
            let nongsaroItems = listResponse.response.body.items?.item;

            if(!nongsaroItems){
                throw new Error(`${name}에 해당하는 식물을 찾을 수 없습니다.`)
            }
            if(!Array.isArray(nongsaroItems)) nongsaroItems = [nongsaroItems];

            setState((prev) => ({
                ...prev, 
                nongsaroList: nongsaroItems,
                isLoading: false,
            }));

            const contentNo = getText(nongsaroItems[0].cntntsNo);

            if (contentNo) {
                await getDetailsByContentNo(contentNo);
            } else {
                throw new Error(`${name}에 대한 상세 정보를 찾을 수 없습니다.`)
            }

            return { nongsaroList: nongsaroItems };

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
            setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }));
            return { nongsaroList: [] }; // 에러 발생 시 빈 배열 반환
        }
    }, [getDetailsByContentNo]);

    return {
        ...state,
        searchByName,
        getDetailsByContentNo,
    };
};
