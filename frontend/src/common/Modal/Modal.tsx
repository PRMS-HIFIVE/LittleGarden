import { ModalContainer, ModalContent, ModalTitle } from "@/common/Modal/Modal.styls";
import { ModalActionChoice } from "@/common/Modal/ModalAction";
import type { ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose?: () => void;
    onCancel?: () => void;
    onConfirm?: () => void;
    children?: ReactNode;
    title?: string;
}

const Modal = ({
    isOpen,
    onClose,
    onConfirm,
    onCancel,
    children,
    title,

}: ModalProps) => {
    if (!isOpen) return null;

    return (
        <ModalContainer>
            {title && <ModalTitle>{title}</ModalTitle>}
            <ModalContent>{children}</ModalContent>
            <ModalActionChoice onConfirm={onConfirm} onCancel={onCancel || onClose}/>
        </ModalContainer>
    )
}

export default Modal;