import LoginButton from '@/components/UI/Button/ButtonVaraints/LoginButton';
import './App.css'
import Button from './components/UI/Button/Button';

function App() {

  return (
    <>
      <Button color="navyBlue">버튼 A</Button>
      <Button variant='diaryMenu'>최신순</Button>
      <LoginButton>로그인</LoginButton>
    </> 
  )
}

export default App
