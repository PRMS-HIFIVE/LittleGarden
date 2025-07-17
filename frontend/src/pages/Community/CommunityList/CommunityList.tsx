// import { useEffect, useState } from "react";
// import { fetchPostsByState } from "@/apis/post.api";
// import type { Post } from "@/hooks/usePostFilter";
// import CardList from "@/common/Card/CardList/CardList";

// const CommunityList = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCommunityPosts = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const data = await fetchPostsByState(2);
//         console.log("받은 posts 데이터:", data);
//         data.forEach((post) => {
//           console.log(
//             "plantTag 타입:",
//             typeof post.plantTag,
//             "isArray:",
//             Array.isArray(post.plantTag)
//           );
//           console.log("plantTag 값:", post.plantTag);
//         });
//         setPosts(data);
//       } catch (e) {
//         console.error("Error fetching community posts:", e);
//         setError("게시글을 불러오는 중 오류가 발생했습니다.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCommunityPosts();
//   }, []);

//   if (loading) return <div>불러오는 중...</div>;
//   if (error) return <div>{error}</div>;
//   if (posts.length === 0) return <div>아직 작성된 글이 없습니다.</div>;

// const cards = posts.map(post => {
//   const plantTag = post.plantTag as unknown;

//   return {
//     userId: post.userId,
//     postId: post.id,
//     title: post.title,
//     content: post.content,
//     date: new Date(post.created_at).toLocaleString(),
//     image: post.img,
//     // tag: post.plantTag,
//     tag: Array.isArray(plantTag)
//       ? plantTag
//       : typeof plantTag === 'string' && plantTag.trim() !== ''
//       ? [plantTag]
//       : [],
//     profileImage: post.profileImage || "",
//   };
// });

//   return <CardList cards={cards} />;
// };

// export default CommunityList;

import { usePostStore } from "@/store/postStore";
import CardList from "@/common/Card/CardList/CardList";
import { useAuthStore } from "@/store/authStore";

const CommunityList = () => {
  const userId = useAuthStore((state) => state.userId);
  const filteredPosts = usePostStore((state) => state.filteredPosts);
  console.log("filteredPosts:", filteredPosts);

  if (!userId) {
    return <div>로그인 정보를 불러오는 중입니다...</div>;
  }

  if (!filteredPosts.length) return <div>작성된 글이 없습니다.</div>;

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
      profileImage: post.profileImage || "",
      nickname: post.nickname,
    };
  });

  return <CardList cards={cards} />;
};

export default CommunityList;
