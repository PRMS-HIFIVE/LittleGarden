import { useAuthStore } from "@/store/authStore";
import CardList from "./../../../common/Card/CardList/CardList";
import { usePostStore } from "@/store/postStore";
import * as S from "./../Diary.styles";

const DiaryList = () => {
    const userId = useAuthStore((s) => s.userId);
    const filteredPosts = usePostStore((s) => s.filteredPosts);

    if (!userId) return <div>로그인 정보를 불러오는 중입니다...</div>;
    if (!filteredPosts) return <div>불러오는 중</div>;

    const cards = filteredPosts
        .filter(post => !!post && typeof post === "object" && post.id)
        .map(post => ({
            userId: post.user_id,
            postId: post.id,
            title: post.title,
            content: post.content,
            date: new Date(post.created_at).toLocaleDateString(),
            image: post.img,
            tag: Array.isArray(post.plantTag)
                ? post.plantTag
                : post.plantTag
                ? [post.plantTag]
                : [],
            profileImage: post.profileImage || "",
            navigatePath: "/diary",
        }));

    return (
        <>
            {cards.length === 0 ? (
                <S.textContainer>
                    <S.noDataText>
                        아직 작성된 글이 없습니다 <br />
                        식물과의 이야기를 남겨보세요
                    </S.noDataText>
                </S.textContainer>
            ) : (
                <CardList cards={cards} navigatePath="/diary" />
            )}
        </>
    );
};

export default DiaryList;
