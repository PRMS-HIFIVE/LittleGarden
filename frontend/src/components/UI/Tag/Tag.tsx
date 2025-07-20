import { StyledTag } from "@/components/UI/Tag/Tag.styles";
import type { TextColors } from "@/styles/paletteMapping";
import type { ReactNode } from "react";

interface TagProps {
    textColor?: TextColors;
    borderColor?: TextColors;
    children?: ReactNode;
    onClick?: () => void;
};

const Tag = ({
    textColor,
    borderColor,
    children,
}: TagProps) => {
    return (
        <StyledTag
            textColor={textColor}
            borderColor={borderColor}
        >
            {children}
        </StyledTag>
    )
}

export default Tag;