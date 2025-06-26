import { StyledInput, type BorderRadius } from "@/components/UI/Input/Input.styles";
import type { inputBorderColors, TextColors } from "@/styles/color";

export interface InputProps {
    type?: string;
    value?: string;
    placeholder?: string;
    width?: string;
    height?: string;
    padding?: string;
    borderColor?: inputBorderColors;
    radius?: BorderRadius;
    textAlign?: 'left' | 'center' | 'right';
    textColor?: TextColors;
    fontSize?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    
}

const Input = ({
    type = 'text',
    value,
    placeholder,
    width,
    height,
    padding,
    borderColor,
    radius,
    textAlign,
    textColor,
    fontSize,
    onChange,
} : InputProps) => {


    return (
        <StyledInput
            type={type}
            value={value}
            placeholder={placeholder}
            width={width}
            height={height}
            padding={padding}
            borderColor={borderColor}
            radius={radius}
            textAlign={textAlign}
            textColor={textColor}
            fontSize={fontSize}
            onChange={onChange}
        />
    )
}

export default Input;