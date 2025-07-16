import { ImageFileInput, ImageUploadContainer, ImageUploadLabel, PreviewImage } from "@/common/From/DiaryForm/ImageUploadBox/ImageUploadBox.styles";
import { palette } from "@/styles/palette";
import { useState } from "react";


const ImageUploadBox = () => {
    const [previews, setPreviews] = useState<(string | null)[]>([null, null, null]);

    const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const updated = [...previews];
            updated[index] = reader.result as string;
            setPreviews(updated);
        };
        reader.readAsDataURL(file);
        }
    };


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