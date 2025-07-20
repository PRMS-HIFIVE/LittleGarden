import { useState } from 'react';
import MainpageHeader from '@/common/Header/HeaderVariants/MainpageHeader';
import * as S from './MyPage.style';
import { useAuthStore } from '@/store/authStore';
import DefaultUsers from '@/assets/images/DefaultUsers.png';
import Button from '@/components/UI/Button/Button';
import Modal from '@/common/Modal/Modal';
import Input from '@/components/UI/Input/Input';
import { updatePassword } from '@/apis/auth.api';

function MyPage(){
    const {user} = useAuthStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handlePasswordChangeConfirm = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            alert('모든 비밀번호 필드를 입력해주세요.');
            return;
        }
        if (newPassword !== confirmPassword) {
            alert('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        try {
            await updatePassword(newPassword);
            console.log("비밀번호 변경 시도:", { currentPassword, newPassword });
            alert('비밀번호가 성공적으로 변경되었습니다.');
            handleCloseModal();
        } catch (error) {
            alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
            console.error(error);
        }
    }

    return(
        <S.MyPageWrapper>
            <MainpageHeader />
            <S.MyPageContainer>
                <h1>🌱</h1>
                <img src={DefaultUsers} alt="" style={{width: '100px'}}/>
                <p>{user?.nickname}</p>
                <p>{user?.email}</p>
                <Button buttonSize='large' type='button' onClick={handleOpenModal}>패스워드 변경</Button>
            </S.MyPageContainer>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handlePasswordChangeConfirm}
                title="비밀번호 변경"
            >
                <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="현재 비밀번호"
                />
                <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="새 비밀번호"
                />
                <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="새 비밀번호 확인"
                />
            </Modal>
        </S.MyPageWrapper>
    )
}


export default MyPage;