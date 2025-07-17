import { CardContainer, CardContent, CardDate, CardHeader, CardProfile, CardThumbnail, CardTitle, CardTitleDateWrapper } from "@/common/Card/Card.styles";
import Tag from "@/components/UI/Tag/Tag";
import { TagContainer } from "@/components/UI/Tag/Tag.styles";
import { useNavigate } from "react-router-dom";

export interface CardProps {
    postId: number;
    title: string;
    content: string;
    date: string;
    image?: string;
    tag?: string[];
    profileImage?: string;
    navigatePath?: string; // 경로 (diary | community)
}

const Card = ({
    postId,
    title,
    content,
    date,
    image,
    tag = ['태그', '확인용', '임시태그', '식물이름'],
    profileImage,
    navigatePath = "/community",
}: CardProps) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`${navigatePath}/${postId}`);
    }
    
    return (
        <CardContainer onClick={handleCardClick} style={{cursor: "pointer"}}>
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