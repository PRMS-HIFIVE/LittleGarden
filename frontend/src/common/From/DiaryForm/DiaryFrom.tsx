import { DiaryContainer, DiaryHeaderTitle, DiaryStyledForm, DiaryStyledTextarea } from "@/common/From/DiaryForm/DiaryForm.styles";
import ImageUploadBox from "@/common/From/DiaryForm/ImageUploadBox/ImageUploadBox";
import Button from "@/components/UI/Button/Button";
import Input from "@/components/UI/Input/Input";

interface DiaryFormProps {
    formTitle?: string;
}

const DiaryForm =({
    formTitle = '작성하기',
}: DiaryFormProps) => {

    return (
        <DiaryContainer>
            <DiaryStyledForm>
                <DiaryHeaderTitle>{formTitle}</DiaryHeaderTitle>
                <Input placeholder="제목을 입력해주세요" radius="8px"/>
                <DiaryStyledTextarea></DiaryStyledTextarea>
                <Input placeholder="태그" radius="8px"/>

                <ImageUploadBox />

                <Button color="navyBlue" type="submit">올리기</Button>
            </DiaryStyledForm>
        </DiaryContainer>
    );
};

export default DiaryForm;