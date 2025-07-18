import DiaryForm from "@/common/Form/DiaryForm/DiaryForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as postAPI from "@/apis/post.api";
import { useAuthStore } from "@/store/authStore";
import type { PlantNameRequest } from "@/components/UI/Select/SelectMyPlant2";
import { usePostStore } from "@/store/postStore";

const DiaryWrite = () => {
    const userId = useAuthStore((state) => state.userId);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedPlants, setSelectedPlants] = useState<PlantNameRequest[]>([]);
    // const [images, setImages] = useState<(File | null)[]>([null, null, null]);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const navigate = useNavigate();

    const addPost = usePostStore((state) => state.addPost);
    const setAllPosts = usePostStore((state) => state.setAllPosts);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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
                img: imageUrl || undefined,
                state: 1,
            });

            let newPost = response.data ?? response;
            if (newPost && !newPost.id && newPost.postData) {
                newPost = newPost.postData;
            }

            if (newPost && newPost.id) {
                addPost(newPost);
            }


            const all = await postAPI.fetchPostsByState(1); 
            setAllPosts(all);

            alert("등록되었습니다");
            navigate("/diary");
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("글 등록이 실패했습니다");
            }
        }
    };

    return (
        <DiaryForm
            formTitle="작성하기"
            title={title}
            content={content}
            selectedPlants={selectedPlants}
            // images={images}
            onChangeTitle={setTitle}
            onChangeContent={setContent}
            onChangeSelectedPlants={setSelectedPlants}
            // onChangeImages={setImages}
            onImageUrlChange={setImageUrl}
            onSubmit={handleSubmit}
        />
    );
};

export default DiaryWrite;
