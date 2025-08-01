import { CardContainer, CardContent, CardDate, CardHeader, CardProfile, CardThumbnail, CardTitle, CardTitleDateWrapper } from "@/common/Card/Card.styles";
import Tag from "@/components/UI/Tag/Tag";
import { TagContainer } from "@/components/UI/Tag/Tag.styles";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export interface CardProps {
    postId: number;
    title: string;
    content: string;
    date: string;
    images?: string[];
    tag?: string[];
    profileImage?: string;
    navigatePath?: string; // 경로 (diary | community)
}

const Card = ({
    postId,
    title,
    content,
    date,
    images = [],
    tag = ['태그', '확인용', '임시태그', '식물이름'],
    profileImage,
    navigatePath = "/community",
}: CardProps) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`${navigatePath}/${postId}`);
    }

    console.log('tag:', tag);
    
    return (
        <CardContainer onClick={handleCardClick} style={{cursor: "pointer"}}>
            <CardHeader>
                {/* <CardProfile src={profileImage} /> */}
                {profileImage ? (
                    <CardProfile src={profileImage} alt="프로필 이미지" />
                ) : (
                    <FaUserCircle size={40} style={{ color: '#ccc' }} />
                )}
                <CardTitleDateWrapper>
                    <CardTitle>{title}</CardTitle>
                    <CardDate>{date}</CardDate>
                </CardTitleDateWrapper>
            </CardHeader>
            <CardContent>{content}</CardContent>
            {images.length > 0 && (
                <CardThumbnail src={images[0]} />
            )}
            {Array.isArray(tag) && tag.filter(Boolean).length > 0 && (
            <TagContainer>
                {tag.filter(Boolean).map((t, i) => (
                <Tag key={i}>{t}</Tag>
                ))}
            </TagContainer>
            )}
        </CardContainer>
    );
};

export default Card;