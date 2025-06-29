# CARD
공통컴포넌트 - 카드

    title: 제목
    content: 본문 내용일부
    date: 작성일
    image: 대표이미지
    tag: 태그

## 사용 예시 (확인용)
    <Card title='오늘의 식물' date='2025.07.07' content='물 주는거 깜빡함' image='' />

    태그는 Card.tsx 의 tag의 배열값 변경해서 확인

    본문내용에 표시되는 줄 수 제한은 (Card.styles.ts)의 CardContent에서 수정 가능합니다.
    * -webkit-line-clamp: number;
