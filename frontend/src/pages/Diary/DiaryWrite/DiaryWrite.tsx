import DiaryForm from "@/common/Form/DiaryForm/DiaryForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as diaryAPI from "@/apis/diary.api"
import { useAuthStore } from "../../../store/authStore";
import type { MyPlantTag } from "@/components/UI/Select/SelectMyPlant";

const DiaryWrite = () => {
    const userId = useAuthStore((state) => state.userId);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    //const [tag, setTag] = useState("");
    const [selectedPlants, setSelectedPlants] = useState<MyPlantTag[]>([]);
    const [images, setImages] = useState<(File | null)[]>([null, null, null]);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId) {
            alert("로그인 후 이용해주세요");
            navigate("/login");
            return;
        }

        try {
/*
            const uploadedUrls = await Promise.all(
                images.filter((file): file is file => file !== null)
                .map (async (file) => {
                    const formData = new FormData();
                    formData.append("image", file);
                    const response =await fetch("",{
                        method: "POST",
                        body: formData,
                    })
                    if (!response.ok) throw new Error("이미지 전송이 실패했습니다");
                    const data = await response.json();
                    return data.url;
                })
            )
*/
            await diaryAPI.postDiary({
                userId,
                title,
                content,
                //plantTag: tag ? tag.split(",").map((t) => t.trim().replace(/^#/, "")) : [],
                plantTag: selectedPlants.map(p => String(p.plantId)),
                state: 1,
                //image: uploadedUrls,
            })
            alert("등록되었습니다");
            navigate("/diary/latest");
        } catch (error: unknown) {
            if(error instanceof Error) {
                alert(error.message);
            } else {
                alert("글 등록이 실패했습니다");
            }

        }
        // 모달로 알림창 추가?
        //navigate('/diary');
    }

    return (
        <DiaryForm
            formTitle="작성하기"
            title={title}
            content={content}
            //tag={tag}
            selectedPlants={selectedPlants}
            images={images}
            onChangeTitle={setTitle}
            onChangeContent={setContent}
            //onChangeTag={setTag}
            onChangeSelectedPlants={setSelectedPlants}
            onChangeImages={setImages}
            onSubmit={handleSubmit}
        />
    )
}

export default DiaryWrite;