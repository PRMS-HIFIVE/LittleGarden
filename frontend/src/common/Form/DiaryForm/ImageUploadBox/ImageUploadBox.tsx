import { uploadImage } from "@/apis/image.api";
import { ImageFileInput, ImageUploadContainer, ImageUploadLabel, PreviewImage } from "@/common/Form/DiaryForm/ImageUploadBox/ImageUploadBox.styles";
import { palette } from "@/styles/palette";

import { useState, type ChangeEvent } from "react";
import { CgSpinner } from "react-icons/cg";

interface ImageUploadBoxProps{
    onUrlChange: (url: string | null) => void;
}

const ImageUploadBox = ({onUrlChange} : ImageUploadBoxProps) => {
    // const [previews, setPreviews] = useState<(string | null)[]>([null, null, null]);
    const [preview, setPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         const updated = [...previews];
    //         updated[index] = reader.result as string;
    //         setPreviews(updated);
    //     };
    //     reader.readAsDataURL(file);
    //     }
    // };

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;

        setIsLoading(true);
        setPreview(URL.createObjectURL(file));
        try{
            const imageUrl = await uploadImage(file);
            setPreview(imageUrl);
            onUrlChange(imageUrl);
        }catch(error){
            alert('이미지 업로드에 실패했습니다.');
            console.log(error);
            setPreview(null);
            onUrlChange(null);
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <ImageUploadContainer>
        {/* {previews.map((preview, index) => (
            <ImageUploadLabel key={index}>
            <ImageFileInput type="file" accept="image/*" onChange={handleChange(index)} />
            {preview ? (
                <PreviewImage src={preview} alt={`preview-${index}`} />
            ) : (
                <span style={{ fontSize: "2rem", color: palette.gray }}>+</span>
            )}
            </ImageUploadLabel>
        ))} */}
        <ImageUploadLabel>
            <ImageFileInput
                type="file"
                accept="image/*"
                onChange={handleChange}
                disabled={isLoading} />
                {isLoading ? <CgSpinner size={32} className="spinner" /> : preview ?(
                    <PreviewImage src={preview} alt="preview" />
                ) :(
                    <span style={{ fontSize: "2rem", color: palette.gray }}>+</span>
                )}
        </ImageUploadLabel>
        </ImageUploadContainer>
    );
  }
    /*
    setPreviews(newPreviews);

    return () => {
      newPreviews.forEach(url => url && URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    const newImages = [...images];
    newImages[index] = file;
    onChangeImages(newImages);
  };
  

  console.log("onChangeImages in ImageUploadBox:", onChangeImages);

  return (
    <ImageUploadContainer>
      {previews.map((preview, index) => (
        <ImageUploadLabel key={index}>
          <ImageFileInput type="file" accept="image/*" onChange={handleChange(index)} />
          {preview ? (
            <PreviewImage src={preview} alt={`preview-${index}`} />
          ) : (
            <span style={{ fontSize: "2rem", color: palette.gray }}>+</span>
          )}
        </ImageUploadLabel>
      ))}
    </ImageUploadContainer>
  );
};
*/

export default ImageUploadBox;
