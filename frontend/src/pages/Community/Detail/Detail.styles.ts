import styled from "styled-components";
import { textColors, backgroundColors, buttonColors, inputBorderColors } from "@/styles/paletteMapping";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 393px;
  margin: 0 auto;
  background-color: ${backgroundColors.white};
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
`;

export const Nickname = styled.span`
  font-weight: 600;
  color: ${textColors.primary};
  margin-left: 15px;
  margin-top: 5px;
`;

export const Date = styled.span`
  font-size: 0.875rem;
  color: ${textColors.secondary};
`;

export const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

export const Content = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

export const ImageWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  overflow-x: auto;
`;

export const Image = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 8px;
`;

export const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const Tag = styled.span`
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  background-color: ${backgroundColors.green};
  color: white;
  border-radius: 16px;
`;

export const SectionDivider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 2rem 0 1rem;
`;

export const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  padding-top: 10vh;
`;

export const CommentForm = styled.form`
  display: flex;
  padding: 1rem;
  border-top: 1px solid #ccc;
  background-color: ${backgroundColors.white};
`;

export const CommentSection = styled.div`
  margin-top: 1rem;
`;

export const EmptyComment = styled.p`
  font-size: 0.9rem;
  color: ${textColors.secondary};
  margin-bottom: 1rem;
`;

export const CommentList = styled.ul`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

// export const CommentItem = styled.li`
//   background-color: #f9f9f9;
//   padding: 0.6rem 0.8rem;
//   border-radius: 8px;
//   list-style: none;
// `;


export const CommentInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid ${inputBorderColors.primary};
  border-radius: 8px;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: ${backgroundColors.green};
  }
`;

export const CommentButton = styled.button`
  margin-left: 0.5rem;
  padding: 0 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  background-color: ${buttonColors.primary};
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #27ae60;
  }
`;


export const CommentItem = styled.li`
  margin-bottom: 1rem;
  list-style: none;
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

export const AuthorBadge = styled.span`
  margin-left: 0.5rem;
  font-size: 0.75rem;
  color: white;
  background-color: ${buttonColors.primary};
  padding: 2px 6px;
  border-radius: 4px;
`;

export const CommentText = styled.p`
  margin-left: 3.5rem;
  margin-top: 0.25rem;
  font-size: 0.9rem;
  line-height: 1.4;
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  padding: 0.5rem;
  border-radius: 10px;
`;

export const IconWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #000;
  }
`;

export const CommentEditInput = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: none;
`;

export const CommentEditActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;

  & > button {
    background-color: #e2e2e2;
    border: none;
    padding: 4px 8px;
    cursor: pointer;
    border-radius: 4px;
  }
`;

export const PostSpacer = styled.div`
  height: 100px;
`

