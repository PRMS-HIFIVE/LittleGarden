import { useEffect, useState } from "react";
import { fetchPostsByState } from "@/apis/post.api";  
import CardList from "@/common/Card/CardList/CardList";
import type { Post } from "@/hooks/usePostFilter";

const CommunityList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommunityPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPostsByState(2);  
        setPosts(data);
      } catch (e) {
        console.error("Error fetching community posts:", e);
        setError("게시글을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchCommunityPosts();
  }, []);

  if (loading) return <div>불러오는 중...</div>;
  if (error) return <div>{error}</div>;
  if (posts.length === 0) return <div>아직 작성된 글이 없습니다.</div>;

  const cards = posts.map(post => ({
    userId: post.userId,
    postId: post.postId,
    title: post.title,
    content: post.content,
    date: new Date(post.createdAt).toLocaleDateString(),
    image: post.img,         
    tag: post.plantTag,
    profileImage: post.profileImage,
  }));

  return <CardList cards={cards} />;
};

export default CommunityList;
