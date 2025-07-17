import DiaryForm from "@/common/Form/DiaryForm/DiaryForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as postAPI from "@/apis/post.api";
import { useAuthStore } from "@/store/authStore";
import type { PlantNameRequest } from "@/components/UI/Select/SelectMyPlant2";

const CommunityWrite = () => {
  const userId = useAuthStore((state) => state.userId);
  console.log("로그인 유저 ID:", userId);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedPlants, setSelectedPlants] = useState<
    /*MyPlantTag[]*/ PlantNameRequest[]
  >([]);
  const [images, setImages] = useState<(File | null)[]>([null, null, null]);

  const navigate = useNavigate();

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
      await postAPI.createPost({
        userId,
        title,
        content,
        plantTag: selectedPlants.map((plant) => plant.cntntsNo),
        image: undefined,
        state: 2,
      });
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
