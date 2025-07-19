import { fetchPostDetail } from "@/apis/post.api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "@/pages/Community/Detail/Detail.styles";
import MainpageHeader from "@/common/Header/HeaderVariants/MainpageHeader";
import { FaUserCircle } from "react-icons/fa";
import LoadingPage from "@/pages/Loading/Loading";
import Tag from "@/components/UI/Tag/Tag";

interface DiaryDetail {
    profileImage: string;
    nickname: string;
    title: string;
    content: string;
    images: string[];
    plantTags:string[];
    createdAt: string;
}

const DiaryDetail = () => {
    const {id} = useParams();
    const postId = Number(id);

    const [post, setPost] = useState<DiaryDetail | null>(null);

    useEffect(() => {
        const init = async() => {
            try {
                const postData = await fetchPostDetail(postId);
                const diaryDetail: DiaryDetail = {
                    profileImage: postData.profileImage || "",
                    nickname: postData.nickname ?? "작성자 이름",
                    title: postData.title,
                    content: postData.content,
                    images:postData.img ? [postData.img] : [],
                    plantTags: postData.plantTag || [],
                    createdAt: postData.created_at
                        ? new Date(postData.created_at).toLocaleString("ko-Kr", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        })
                        : "날짜 정보 없음"
                }
                setPost(diaryDetail);
            } catch (err) {
                console.error("게시글 불러오기 실패", err);
            }
        }
        if (postId) init();
    }, [postId]);

    if (!post) return <LoadingPage />;

    return (
        <S.Container>
            <S.ScrollArea>
                <MainpageHeader />
                <S.PostSpacer />
                <S.SectionDivider />
                <S.PostHeader>
                    {post.profileImage ? (
                        <S.ProfileImage src={post.profileImage} alt="프로필 이미지" />
                    ) : (
                        <FaUserCircle size={35} style={{color: '#ccc'}} />
                    )}
                    <S.Nickname>{post.nickname}</S.Nickname>
                </S.PostHeader>

                <S.Title>{post.title}</S.Title>
                <S.Content>{post.content}</S.Content>

                <S.ImageWrapper>
                          {post.images.map((img, idx) => (
                            <S.Image key={idx} src={img} alt={`img-${idx}`} />
                          ))}
                        </S.ImageWrapper>
                
                        <S.TagWrapper>
                          {post.plantTags.map((tag, idx) => (
                            <Tag key={idx}>{tag}</Tag>
                          ))}
                        </S.TagWrapper>
                
                        <S.Date>{post.createdAt}</S.Date>
                        <S.SectionDivider />

            </S.ScrollArea>
        </S.Container>
    )
}

export default DiaryDetail;