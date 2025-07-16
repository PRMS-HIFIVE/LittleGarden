
export interface MyPlantTagData {
    userId: number;
    plantId: number;
    name: string;
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