interface ResizeImageOptions {
    maxSize: number; // 이미지의 최대 너비 또는 높이
    quality: number; // 이미지 품질 (0 to 1)
}

/**
 * 이미지 파일의 크기를 조절하고 Base64 데이터 URL로 변환합니다.
 * @param file 원본 이미지 파일
 * @param options 리사이즈 옵션 (최대 크기, 품질)
 * @returns 리사이즈된 이미지의 Base64 문자열을 담은 Promise
 */
export const resizeImage = (file: File, options: ResizeImageOptions): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const { maxSize, quality } = options;

                let { width, height } = img;

                // 이미지 비율을 유지하면서 최대 크기에 맞게 조절
                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width *= maxSize / height;
                        height = maxSize;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) return reject(new Error('2D 컨텍스트를 가져올 수 없습니다.'));

                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL(file.type, quality));
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
};