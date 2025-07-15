const IMGBB_API_URL = "https://api.imgbb.com/1/upload";

export const uploadImage = async (imageFile: File): Promise<string> => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    if (!apiKey) {
        throw new Error("ImgBB API 키가 .env 파일에 설정되지 않았습니다.");
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(`${IMGBB_API_URL}?key=${apiKey}`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("이미지 업로드에 실패했습니다.");
    }

    const result = await response.json();

    if (!result.success) {
        throw new Error(result.error?.message || "ImgBB에서 이미지 업로드 중 오류가 발생했습니다.");
    }

    return result.data.url;
};

