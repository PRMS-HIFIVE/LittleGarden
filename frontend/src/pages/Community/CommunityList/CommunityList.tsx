import { usePostStore } from "@/store/postStore";
//import CardList from "@/common/Card/CardList/CardList";
import { useAuthStore } from "@/store/authStore";
import * as S from "../../Diary/Diary.styles"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardListNoTag from "@/common/Card/CardList/CardListNoTag";


const CommunityList = () => {
  // const userId = useAuthStore((state) => state.userId);
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const filteredPosts = usePostStore((state) => state.filteredPosts);
  console.log("filteredPosts:", filteredPosts);

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

  if (!filteredPosts.length) return <div style={{height: "100%"}}>
                    <S.textContainer>
                      <S.noDataText>
                        아직 작성된 글이 없습니다
                      </S.noDataText>
                    </S.textContainer>
                  </div>;


  //if (!filteredPosts.length) return <div>작성된 글이 없습니다.</div>;


  // if (!userId) {
  //   return <div>로그인 정보를 불러오는 중입니다...</div>;
  // }

  // if (!filteredPosts.length) return <div>작성된 글이 없습니다.</div>;

  const cards = filteredPosts.map((post) => {
    const plantTag = post.plantTag as string | string[] | undefined;

    return {
      userId: post.user_id,
      postId: post.id,
      title: post.title,
      content: post.content,
      date: new Date(post.created_at).toLocaleString(),
      image: post.img,
      tag: Array.isArray(plantTag)
        ? plantTag
        : typeof plantTag === "string" && plantTag.trim() !== ""
        ? [plantTag]
        : [],
      // tag: post.plantTag,
      profileImage: post.profileImage || "",
      nickname: post.nickname,
    };
  });

  return <CardListNoTag cards={cards} />;
};

export default CommunityList;
