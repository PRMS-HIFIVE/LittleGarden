import { DiaryContainer, DiaryHeaderTitle, DiaryStyledForm, DiaryStyledTextarea } from "@/common/Form/DiaryForm/DiaryForm.styles";
import ImageUploadBox from "@/common/Form/DiaryForm/ImageUploadBox/ImageUploadBox";
import DiaryHeader from "@/common/Header/HeaderVariants/DiaryHeader";
import Button from "@/components/UI/Button/Button";
import Input from "@/components/UI/Input/Input";
//import /*PlantSelector,*/ { type MyPlantTag } from "@/components/UI/Select/SelectMyPlant";
import { AddedTag, TagList } from "@/components/UI/Select/SelectMyPlant.styles";
import PlantSelector2, { type PlantNameRequest } from "@/components/UI/Select/SelectMyPlant2";
//import { usePlantStore } from "@/store/plantStore";

interface DiaryFormProps {
  formTitle?: string;
  title: string;
  content: string;
  //tag: string;
  //selectedPlants: MyPlantTag[];
  //2
  selectedPlants: PlantNameRequest[];
//   images: (File | null)[];
  onChangeTitle: (value: string) => void;
  onChangeContent: (value: string) => void;
  //onChangeTag: (value: string) => void;
  onChangeSelectedPlants: (plants: /*MyPlantTag[]*/PlantNameRequest[]) => void;
//   onChangeImages: (files: (File | null)[]) => void;
  onSubmit: (e: React.FormEvent) => void;
  onImageUrlChange: (url: string | null) => void;
}

const DiaryForm =({
    formTitle = '작성하기',
    title,
    content,
    //tag,
    selectedPlants,
    onChangeTitle,
    onChangeContent,
    //onChangeTag,
    onChangeSelectedPlants,
    onSubmit,
    //images,
    //onChangeImages,
    onImageUrlChange,
    }: DiaryFormProps) => {
    //const { plants } = usePlantStore();

    return (
        <>
            <DiaryContainer>
                <DiaryHeader></DiaryHeader>
                <DiaryStyledForm onSubmit={onSubmit}>
                    <div style={{marginTop: '5rem'}}></div>
                    <DiaryHeaderTitle>{formTitle}</DiaryHeaderTitle>
                    <Input
                        placeholder="제목을 입력해주세요" 
                        radius="8px" margin='0px 0px 10px 0px'
                        value={title}
                        onChange={(e) => onChangeTitle(e.target.value)}
                    />
                    <DiaryStyledTextarea
                        placeholder="내용을 입력해주세요"
                        value={content}
                        onChange={(e) => onChangeContent(e.target.value)}
                    />
                    {/* <Input 
                        placeholder="태그" 
                        radius="8px" 
                        margin='0px 0px 10px 0px'
                        value={tag}
                        onChange={(e) => onChangeTag(e.target.value)}
                    /> */}

                    <PlantSelector2
                        //plants={plants}
                        //onChange={onChangeSelectedPlants}
                        onChange={onChangeSelectedPlants}

                    />
                    
                    {selectedPlants.length > 0 && (
                        <TagList>
                            {selectedPlants.map((plant) => (
                                <AddedTag key={plant.cntntsNo}>
                                    {plant.cntntsSj}
                                </AddedTag>
                            ))}
                        </TagList>
                    )}

                    <ImageUploadBox
                        //images={images}
                        //onChangeImages={onChangeImage}
                        onUrlChange={onImageUrlChange}
                    />

                    <Button 
                        color="navyBlue" 
                        type="submit" 
                        width='220px' 
                        height='35px' 
                        radius="30px" 
                        margin="20px 0px 80px 0px"
                        >올리기
                    </Button>
                </DiaryStyledForm>
            </DiaryContainer>
        </>
    );
};

export default DiaryForm;