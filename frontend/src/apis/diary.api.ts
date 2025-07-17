// 성장일기 API

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 임시 태그
//const tempPlantTags = ["1", "2"];


export interface DiaryData {
    title: string;
    content: string;
    plantTag?: string[];
    state: number;
    image?: string; // (file | null)[];
    isHealth?: number;
}

export interface GetDiaryPayload extends DiaryData {
    userId: number;
    postId: number;
    createdAt: string;
}

export interface PostDiaryPayload extends DiaryData {
    userId: number;
}

export interface PutDiaryPayload extends DiaryData {
    postId: number;
    userId: number;
}

export type DiaryPayloadUnion = GetDiaryPayload | PostDiaryPayload | PutDiaryPayload;

// 게시글 조회
export const getDiary = async (userId: number) => {
    //const token = getAuthToken();

    const response = await fetch(`${API_BASE_URL}/posts?userId=${userId}&state=1`, {
        headers: {
            //"Authorization": `Bearer ${token ?? ""}`,
        }
    });
    if(!response.ok) {
        const result = await response.json();
        throw new Error (result.message || "일기목록을 불러오는데 실패했습니다");
    }
    return await response.json();
}

// 게시글 등록
export const postDiary = async (payload: PostDiaryPayload) => {
    //const token = getAuthToken();
    // 이미지 보낼때 배열일때
    // const formData = new FormData();

    // formData.append("title", payload.title);
    // formData.append("content", payload.content);
    // formData.append("state", String(payload.state));
    // (payload.plantTag ?? []).forEach(tag => formData.append("plantTag", tag));
    // payload.image.forEach(file => {
    //     if (file) formData.append("image", file);
    // });

    const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            //"Authorization": `Bearer ${token ?? ""}`,
        },
        body: JSON.stringify(
            {
                userId: payload.userId,
                title: payload.title,
                content: payload.content,
                plantTag: payload.plantTag?.length ? payload.plantTag : undefined,
                //plantTag: tempPlantTags, // 임시 태그
                state: payload.state,
                image: payload.image,
            }
        )
    });

    if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "글 등록에 실패했습니다");
    }

    return await response.json();
}

// 게시글 수정
export const putDiary = async (payload: PutDiaryPayload) => {
    //const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/posts/${payload.postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            //"Authorization": `Bearer ${token ?? ""}`,
        },
        body: JSON.stringify({
            userId: payload.userId,
            postId: payload.postId,
            title: payload.title,
            content: payload.content,
            plantTag: payload.plantTag?.length ? payload.plantTag : undefined,// 빈 배열로도 보내도 1064 쿼리에러 나서 undefined로 처리
            state: payload.state,
            image: payload.image,
        })
    })

    if (!response.ok) {
        const result = await response.json();
        throw new Error (result.message || "글 수정에 실패했습니다")
    }
    return await response.json();
}

// 게시글 삭제
export const deleteDiary = async (postId: number) => {
    //const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers:{
            //Authorization: `Bearer ${token ?? ""}`,
        }
    });

    if (!response.ok) {
        const result = await response.json();
        throw new Error (result.message || "글 삭제에 실패했습니다");
    }
    if (response.status === 204) { // 게시글 삭제후 빈 응답
        return null;
    }

    return await response.json();
}


// 토큰 확인
// export const getAuthToken = ():string => {
//     const token = localStorage.getItem("token");
//     if(!token) throw new Error ("인증토큰이 없습니다")
//     return token;
// }