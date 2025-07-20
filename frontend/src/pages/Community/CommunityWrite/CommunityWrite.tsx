import CommunityForm from "@/common/Form/CommunityForm/CommunityForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as postAPI from "@/apis/post.api";
import { useAuthStore } from "@/store/authStore";
//import type { PlantNameRequest } from "@/components/UI/Select/SelectMyPlant2";
import { usePostStore } from "@/store/postStore";
import { uploadImage } from "@/apis/image.api";

const CommunityWrite = () => {
  const userId = useAuthStore((state) => state.userId);
  console.log("글쓰기 로그인 유저 ID:", userId);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //const [selectedPlants, setSelectedPlants] = useState<
  //  /*MyPlantTag[]*/ PlantNameRequest[]
  //>([]);
  const [images, setImages] = useState<(File | null)[]>([null, null, null]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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
      /*
      const response = await postAPI.createPost({
        userId,
        title,
        content,
        //plantTag: selectedPlants.map((plant) => plant.cntntsNo),
        img: imageUrl || undefined,
        state: 2,
      });

      const newPost = response.data ?? response;
      */
      const uploadedImageUrls = await Promise.all(
        images
          .filter((file): file is File => file !== null)
          .map((file) => uploadImage(file))
      );

      const payload = {
        userId,
        title,
        content,
        // plantTag는 아예 빼거나 빈 배열로 보내도 됨
        // plantTag: [],
        img: imageUrl || undefined,
        state: 2,
        image: uploadedImageUrls.length > 0 ? uploadedImageUrls : undefined,
      };

      const response = await postAPI.createPost(payload);

      let newPost = response.data ?? response;
      if (newPost && !newPost.id && newPost.postData) {
        newPost = newPost.postData;
      }

      if (newPost && newPost.id) {
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

  console.log("setImages in DiaryWrite:", setImages);

  return (
    <CommunityForm
      formTitle="커뮤니티 글 작성"
      title={title}
      content={content}
      //selectedPlants={selectedPlants}
      // images={images}
      onChangeTitle={setTitle}
      onChangeContent={setContent}
      //onChangeSelectedPlants={setSelectedPlants}
      //onChangeImages={setImages}
      onImageUrlChange={setImageUrl}
      onSubmit={handleSubmit}
    />
  );
};

export default CommunityWrite;
