import { CardContainer, CardContent, CardDate, CardHeader, CardProfile, CardThumbnail, CardTitle, CardTitleDateWrapper } from "@/common/Card/Card.styles";
import Tag from "@/components/UI/Tag/Tag";
import { TagContainer } from "@/components/UI/Tag/Tag.styles";

export interface CardProps {
    title: string;
    content: string;
    date: string;
    image?: string;
    tag?: string[];
    profileImage?: string;
}

const Card = ({
    title,
    content,
    date,
    image,
    tag = ['태그', '확인용', '임시태그', '식물이름'],
    profileImage,
}: CardProps) => {
    
    return (
        <CardContainer>
            <CardHeader>
                <CardProfile src={profileImage} />
                <CardTitleDateWrapper>
                    <CardTitle>{title}</CardTitle>
                    <CardDate>{date}</CardDate>
                </CardTitleDateWrapper>
            </CardHeader>
            <CardContent>{content}</CardContent>
            {image && <CardThumbnail src={image} />}
            <TagContainer>
                {tag.map((t, i) => (
                    <Tag key={i}>{t}</Tag>
                ))}
            </TagContainer>
        </CardContainer>
    );
};

export default Card;