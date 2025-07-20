import { CardContainer, CardContent, CardDate, CardHeader, CardProfile, CardThumbnail, CardTitle, CardTitleDateWrapper } from "@/common/Card/Card.styles";
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

const CardNoTag = ({
    postId,
    title,
    content,
    date,
    images = [],
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
        </CardContainer>
    );
};

export default CardNoTag;