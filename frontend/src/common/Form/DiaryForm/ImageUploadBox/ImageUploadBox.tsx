import { ImageFileInput, ImageUploadContainer, ImageUploadLabel, PreviewImage } from "@/common/Form/DiaryForm/ImageUploadBox/ImageUploadBox.styles";
import { palette } from "@/styles/palette";
import { useEffect, useState } from "react";

interface ImageUploadBoxProps {
  images?: (File | null)[]; // ?를 붙여 undefined 대응
  onChangeImages: (files: (File | null)[]) => void;
}

// defaultProps 패턴으로 기본값을 지정
const DEFAULT_IMAGES = [null, null, null];

const ImageUploadBox = ({
  images = DEFAULT_IMAGES,
  onChangeImages
}: ImageUploadBoxProps) => {
  const [previews, setPreviews] = useState<(string | null)[]>(DEFAULT_IMAGES);

  useEffect(() => {
    const newPreviews = (images ?? DEFAULT_IMAGES).map(file =>
      file ? URL.createObjectURL(file) : null
    );
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

export default ImageUploadBox;
