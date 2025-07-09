import * as S from "./Loading.styles";
import loadingImg from "@/assets/images/Loading.png";

const LoadingPage = () => {
  return (
    <S.Overlay>
      <S.Spinner src={loadingImg} alt="로딩 중" />
    </S.Overlay>
  );
};

export default LoadingPage;
