import * as S from './Footer.style';
import Camera from '../assets/icons/camera.svg?react';
import type { ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconLogo } from '@/assets/icons/IconList';

export interface FooterProps{
    type?: 'camera' | 'post';
}

const Footer = ({
        type = 'camera'
    }: FooterProps) => {
    const footerType = type ?? 'camera';
    const navigate = useNavigate();
    const email = localStorage.getItem('user');

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(file){
            navigate('/register-plant', { state: { imageFile: file } });
        }
        event.target.value = '';
    }

    const handleCameraClick = (e: MouseEvent<HTMLLabelElement>) => {
        if (!email) {
            e.preventDefault();
            alert('로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.');
            navigate('/login');
        }
    }

    return(
        <S.FooterWrapper>
            {
                footerType === 'camera' && (
                    <>
                        <label htmlFor="camera-upload" style={{ cursor: 'pointer' }} onClick={handleCameraClick}>
                            <Camera />
                        </label>
                        <input
                            id="camera-upload"
                            style={{ display: 'none' }}
                            accept="image/*"
                            type="file"
                            capture="environment"
                            onChange={handleFileChange}
                        />
                    </>
                )
            }
            {
                footerType === 'post' && (
                    <>
                        <IconLogo size={32} />
                    </>
                )

            }
        </S.FooterWrapper>
    )
}

export default Footer;