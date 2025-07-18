import DiaryForm from "@/common/Form/DiaryForm/DiaryForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as postAPI from "@/apis/post.api";
import { useAuthStore } from "@/store/authStore";
import type { PlantNameRequest } from "@/components/UI/Select/SelectMyPlant2";
import { usePostStore } from "@/store/postStore";

const CommunityWrite = () => {
  const userId = useAuthStore((state) => state.userId);
  console.log("글쓰기 로그인 유저 ID:", userId);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedPlants, setSelectedPlants] = useState<
    /*MyPlantTag[]*/ PlantNameRequest[]
  >([]);
  const [images, setImages] = useState<(File | null)[]>([null, null, null]);

  const navigate = useNavigate();

  const addPost = usePostStore((state) => state.addPost);
  const setAllPosts = usePostStore((state) => state.setAllPosts);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userId);

    if (!userId) {
      alert("로그인 후 이용해주세요");
      navigate("/login");
      return;
    }
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요");
      return;
    }

    try {
      const response = await postAPI.createPost({
        userId,
        title,
        content,
        plantTag: selectedPlants.map((plant) => plant.cntntsNo),
        image: undefined,
        state: 2,
      });

      const newPost = response.data;

      if (newPost) {
        addPost(newPost);
      } else {
        const all = await postAPI.fetchPostsByState(2);
        setAllPosts(all);
      }
      console.log("등록 후 newPost.id:", newPost.id);

      alert("등록되었습니다");
      navigate("/community");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      else alert("글 등록 실패");
    }
  };

  return (
    <DiaryForm
      formTitle="커뮤니티 글 작성"
      title={title}
      content={content}
      selectedPlants={selectedPlants}
      images={images}
      onChangeTitle={setTitle}
      onChangeContent={setContent}
      onChangeSelectedPlants={setSelectedPlants}
      onChangeImages={setImages}
      onSubmit={handleSubmit}
    />
  );
};

export default CommunityWrite;
