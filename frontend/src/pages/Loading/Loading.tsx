import * as S from "./Loading.style";
import loadingImg from "@/assets/images/image.png";

const LoadingPage = () => {
  return (
    <S.Overlay>
      <S.Spinner src={loadingImg} alt="로딩 중" />
    </S.Overlay>
  );
};

export default LoadingPage;
