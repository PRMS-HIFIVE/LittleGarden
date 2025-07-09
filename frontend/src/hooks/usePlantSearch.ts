import { useState, useCallback } from "react";
import {
    identifyPlantByImage,
    searchPlantByNameOnNongsaro,
    getPlantDetailFromNongsaro,
    type PlantIdSuggestion,
    type NongsaroListItem,
    type NongsaroDetailItem,
} from "@/apis/plant.api";
import { resizeImage } from "@/utils/image";

/** 컴포넌트에서 사용하기 쉽도록 가공된 식물 상세 정보 타입 */
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
    fertilizer: string;
}

/** usePlantSearch 훅이 관리하는 상태 타입 */
interface PlantSearchState {
    data: PlantDetail | null;
    suggestions: PlantIdSuggestion[] | null;
    nongsaroList: NongsaroListItem[] | null;
    isLoading: boolean;
    error: string | null;
}

/** CDATA 또는 일반 텍스트 노드에서 텍스트 값을 추출하는 헬퍼 함수 */
const getText = (node: { _text?: string; _cdata?: string } | undefined): string => {
    if (!node) return '';
    return (node._text || node._cdata) ?? '';
};

/**
 * 이미지 파일을 기반으로 식물 정보를 검색하는 커스텀 훅
 * 1. Plant.id로 이미지 식별
 * 2. 농사로 API에서 이름으로 검색
 * 3. 농사로 API에서 상세 정보 조회
 */
export const usePlantSearch = () => {
    const [state, setState] = useState<PlantSearchState>({
        data: null,
        suggestions: null,
        nongsaroList: null,
        isLoading: false,
        error: null,
    });

    /** Nongsaro API 응답을 PlantDetail 타입으로 변환하는 헬퍼 함수 */
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
        fertilizer: getText(rawDetail.frtlzrInfo),
    }), []);

    /** 콘텐츠 번호로 상세 정보를 조회하고 상태를 업데이트하는 함수 */
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
            const errorMessage = err instanceof Error ? err.message : "상세 정보를 가져오는데 실패했습니다.";
            setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }));
        }
    }, [mapToPlantDetail]);

    /** 이미지 파일로 식물 검색을 시작하는 함수 */
  const searchByImage = useCallback(async (imageFile: File) => {
        setState({ data: null, suggestions: null, nongsaroList: null, isLoading: true, error: null });

        try {
            // 1. 이미지 리사이즈 후 Base64로 변환하여 식별 (Plant.id)
            const imageBase64 = await resizeImage(imageFile, { maxSize: 800, quality: 0.8 });
            const idResponse = await identifyPlantByImage(imageBase64);
            const suggestions = idResponse.result.classification.suggestions;

            if (!suggestions || suggestions.length === 0) {
                throw new Error("식물을 식별할 수 없습니다. 다른 사진으로 시도해주세요.");
            }

            // 2. 식물 목록 검색 (농사로)
            const topSuggestionName = suggestions[0].name;
            const listResponse = await searchPlantByNameOnNongsaro(topSuggestionName);
            let nongsaroItems = listResponse.response.body.items?.item;

            if (!nongsaroItems) {
                throw new Error(`'${topSuggestionName}'에 대한 정보를 농사로에서 찾을 수 없습니다.`);
            }
            if (!Array.isArray(nongsaroItems)) nongsaroItems = [nongsaroItems]; // 단일 객체일 경우 배열로 변환

            setState((prev) => ({ ...prev, suggestions, nongsaroList: nongsaroItems }));

            // 3. 식물 상세 정보 조회 (농사로)
            const contentNo = getText(nongsaroItems[0]?.cntntsNo);

            if (contentNo) {
                await getDetailsByContentNo(contentNo);
            } else {
                throw new Error(`'${topSuggestionName}'에 대한 상세 정보(콘텐츠 번호)를 찾을 수 없습니다.`);
            }

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
            setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }));
        }
  }, [getDetailsByContentNo]);

    return {
        ...state,
        searchByImage,
        getDetailsByContentNo,
    };
};
