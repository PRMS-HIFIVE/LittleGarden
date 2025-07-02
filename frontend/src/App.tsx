import './App.css'
import GlobalStyle from "@/styles/globalStyles"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login/Login'
import Join from './pages/Join/Join'
import CommunityDetail from './pages/Community/Detail/Detail'
import Password from './pages/Password/Password'

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password" element={<Password />} />
          <Route path="/join" element={<Join />} />
          <Route path="/detail" element={<CommunityDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
