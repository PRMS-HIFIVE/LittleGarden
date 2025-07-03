import * as S from './Footer.style';
import Camera from '../assets/icons/camera.svg?react';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconLogo } from '@/assets/icons/IconList';

export interface FooterProps{
    type?: 'camera' | 'post';
}

const Footer = ({
        type = 'camera'
    }: FooterProps) => {
    const footerType = type ?? 'camera';
    const navigate = useNavigate();

    const handlePage = () => {
        navigate(-1);
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(file){
            navigate('/register-plant', { state: { imageFile: file } });
        }
        event.target.value = '';
    }

    return(
        <S.FooterWrapper>
            {
                footerType === 'camera' && (
                    <>
                        <IconArrowLeft
                            onClick={handlePage}
                            className='back-arrow' />
                        <label htmlFor="camera-upload" style={{ cursor: 'pointer' }}>
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
                        <IconArrowLeft
                            onClick={handlePage}
                            className='back-arrow' />
                        <IconLogo size={32} />
                    </>
                )

            }
        </S.FooterWrapper>
    )
}

export default Footer;