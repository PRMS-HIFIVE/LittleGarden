import * as diaryAPI from "@/apis/diary.api";
import type { DiaryData } from "@/pages/Diary/DiaryList/DiaryList";
import { GridWrapper, PhotoCard } from "@/pages/Diary/DiaryPhotoList/DiaryPhotoList.styles";
import { useEffect, useState } from "react";

 
const DiaryPhotoList = () => {
    const [diaries, setDiaries] = useState<DiaryData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDiaries = async () => {
            setLoading(true);
            setError(null);

            try {
                const userId = Number(localStorage.getItem("userId"));
                const data: DiaryData[] = await diaryAPI.getDiary();

                const filtered = data.filter(diary => diary.userId === userId && diary.image?.trim());

                const sorted = filtered.sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setDiaries(sorted);
            } catch (error : unknown) {
                if (error instanceof Error) {
                    setError(error.message || "사진 목록을 불러오는데 실패했습니다");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchDiaries();
    }, []);

    if (loading) return <div>불러오는 중</div>;
    if (error) return <div>{error}</div>;

    if (diaries.length === 0) {
        return <div>사진이 포함된 게시물이 없습니다</div>
    }

    return (
        <GridWrapper>
            {diaries.map((diary, index) => (
                <PhotoCard 
                    key={diary.postId}
                    isFirst={index === 0}
                    style={{ backgroundImage: `url(${diary.image})` }}
                    title={diary.title}
                />
            ))}
        </GridWrapper>
    );
}

export default DiaryPhotoList;