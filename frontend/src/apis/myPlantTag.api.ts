
export interface MyPlantTagData {
    //userId: number;
    plantId: string; // 저장된 식물
    name: string; // id로 받아온 이름
}

export const getMyPlantTag = async (): Promise<MyPlantTagData[]> => {
    const token = localStorage.getItem("token");
    const response = await fetch(`/plants`, {
        headers: {
            Authorization: `Bearer ${token ?? "" }`,
        }
    });

    if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "태그 목록을 불러오는데 실패했습니다");
    }
    
    return await response.json();
}