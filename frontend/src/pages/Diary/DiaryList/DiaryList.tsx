import * as diaryAPI from "@/apis/diary.api"
import { useEffect, useState } from "react";
import CardList from './../../../common/Card/CardList/CardList';

export interface DiaryData {
    userId: number;
    postId: number;
    title: string;
    content: string;
    createdAt: string;
    image?: string;
    plantTag?: string[];
    profileImage?: string;
}

// 작성 게시글
const DiaryList = () => {
    const [diaries, setDiaries] = useState<DiaryData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect( () => {
        const fetchDiaries = async () => {
            setLoading(true);
            setError(null);
            try {
                const userId = Number(localStorage.getItem("userId"));
                const data: DiaryData[] = await diaryAPI.getDiary(userId); // diary.api 쪽에서는 전체 다 받아오고, 아래에서 필터링

                // userId로 필터링
                const filtered = data.filter(diary => diary.userId === userId);

                // 기본적으로 정렬상태
                const sorted = filtered.sort((a: DiaryData, b: DiaryData) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setDiaries(sorted);

            } catch (error : unknown) {
                if (error instanceof Error) {
                    setError(error.message || "목록을 불러오는데 실패했습니다");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchDiaries();
    }, [])

    if (loading) return <div>불러오는 중</div>
    if (error) return <div>{error}</div>


    const cards = diaries.map(diary => ({
        userId: diary.userId,
        postId: diary.postId,
        title: diary.title,
        content: diary.content,
        date: new Date(diary.createdAt).toLocaleDateString(),
        image: diary.image,
        tag: diary.plantTag,
        profileImage: diary.profileImage,
    }))

    return (
        <>
            {cards.length === 0
                ? <div>아직 작성된 글이 없습니다. 다른 사람들과 이야기를 나눠보세요</div>
                : <CardList cards={cards} />
            }
        </>
    )
}

export default DiaryList;