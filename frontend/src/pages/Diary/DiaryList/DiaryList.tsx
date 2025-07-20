import { useAuthStore } from "@/store/authStore";
import CardList from "./../../../common/Card/CardList/CardList";
import { usePostStore } from "@/store/postStore";
import * as S from "./../Diary.styles";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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

interface DiaryListProps {
  viewMode: "latest" | "photoOnly";
}

const DiaryList = ({ viewMode }: DiaryListProps) => {
  // const userId = useAuthStore((s) => s.userId);
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const filteredPosts = usePostStore((state) => state.filteredPosts);

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      navigate("/login");
    }
  }, [isInitialized, isAuthenticated, navigate]);

  if (!isInitialized) {
    return <div>로그인 정보를 불러오는 중입니다...</div>;
  }

  if (!isAuthenticated) {
    return <div>로그인이 필요합니다.</div>;
  }

  // if (!userId) return <div>로그인 정보를 불러오는 중입니다...</div>;
  // if (!filteredPosts) return <div>불러오는 중</div>;

  const cards = filteredPosts
    .filter((post) => !!post && typeof post === "object" && post.id)
    .map((post) => ({
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
            {viewMode === "latest"
              ? "아직 작성된 글이 없습니다 \n 식물과의 이야기를 남겨보세요"
              : "사진이 포함된 게시물이 없습니다"}
          </S.noDataText>
        </S.textContainer>
      ) : (
        <CardList cards={cards} navigatePath="/diary" />
      )}
    </>
  );
};

export default DiaryList;
