# Button
공통컴포넌트 - 버튼

Button.config.ts에서 variants를 추가하여 디자인을 정해서 사용하거나 
props로 
    variant     지정디자인
    color       배경색
    buttonSize  버튼 크기(미지정시 기본값 또는 아래 width, height로 별도로 조절)
    width   
    height로
    styleType   (filled - 단색 / outline - 외곽선 / clear - 투명 )
    radius      (square - 사각형 / semiRound - 4px 둥근 모서리 / round - 8px 둥근 모서리 / pill - 알약모양)

## 사용 예시

    <Button color="navyBlue">버튼</Button>
    <Button variant='diaryMenu'>최신순</Button>
    <Button variant='diaryMenu' width='200px' color='navyBlue'>글쓰기</Button>
    <LoginButton/>
    <Button buttonSize="medium">로그인</Button>

