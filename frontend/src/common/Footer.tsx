import * as S from './Footer.style';
import Camera from '../assets/icons/camera.svg?react';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

function Footer () {
    const navigate = useNavigate();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(file){
            navigate('/upload-preview', { state: { imageFile: file } });
        }
        event.target.value = '';
    }

    return(
        <S.FooterWrapper>
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
        </S.FooterWrapper>
    )
}

export default Footer;