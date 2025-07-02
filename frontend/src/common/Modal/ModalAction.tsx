import styled from "styled-components";
import Button from "@/components/UI/Button/Button";

interface ModalActionProps {
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
}

export const ModalActionContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 12px;
    margin-bottom: 20px;
`;


export const ModalActionChoice = ({
    onConfirm,
    onCancel,
    confirmText = '확인',
    cancelText = '취소',
}: ModalActionProps) => {

    return (
        <ModalActionContainer>
            {onCancel && (
                <Button color='gray' onClick={onCancel}>{cancelText}</Button>
            )}
            {onConfirm && (
                <Button color='primary' onClick={onConfirm}>{confirmText}</Button>
            )}
        </ModalActionContainer>
    )
}
