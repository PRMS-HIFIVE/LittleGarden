import DiaryForm from "@/common/Form/DiaryForm/DiaryForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as postAPI from "@/apis/post.api";
import { useAuthStore } from "@/store/authStore";
import type { PlantNameRequest } from "@/components/UI/Select/SelectMyPlant2";
import { usePostStore } from "@/store/postStore";
import { uploadImage } from "@/apis/image.api";

const DiaryWrite = () => {
    const userId = useAuthStore((state) => state.userId);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedPlants, setSelectedPlants] = useState<PlantNameRequest[]>([]);
    const [images, setImages] = useState<(File | null)[]>([null, null, null]);
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
            const uploadedImageUrls = await Promise.all(
                images
                    .filter((file): file is File => file !== null) // null 제외
                    .map((file) => uploadImage(file))
            );

            const payload = {
                userId,
                title,
                content,
                plantTag: selectedPlants.map((plant) => plant.cntntsNo),
                img: imageUrl || undefined,
                state: 1,
                image: uploadedImageUrls.length > 0 ? uploadedImageUrls : undefined,
            };

            const response = await postAPI.createPost(payload);


                        /*
            -----
            const formData = new FormData();
            formData.append("userId", String(userId));
            formData.append("title", title);
            formData.append("content", content);
            formData.append("state", "1");
            formData.append("plantTag", JSON.stringify(selectedPlants.map((p) => p.cntntsNo)));

            images.forEach((file) => {
            if (file) {
                formData.append("images", file);
            }
            });

            const response = await postAPI.createPost(formData);
            -----
            */

            // json
            // const response = await postAPI.createPost({
            //     userId,
            //     title,
            //     content,
            //     plantTag: selectedPlants.map((plant) => plant.cntntsNo),
            //     image: undefined,
            //     state: 1,
            // });

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

    console.log("setImages in DiaryWrite:", setImages);

    return (
        <DiaryForm
            formTitle="작성하기"
            title={title}
            content={content}
            selectedPlants={selectedPlants}
            images={images}
            onChangeTitle={setTitle}
            onChangeContent={setContent}
            onChangeSelectedPlants={setSelectedPlants}
            onChangeImages={setImages}
            onImageUrlChange={setImageUrl}
            onSubmit={handleSubmit}
        />
    );
};

export default DiaryWrite;
