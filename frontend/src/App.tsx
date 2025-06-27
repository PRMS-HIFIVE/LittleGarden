import './App.css'
import GlobalStyle from "@/styles/globalStyles"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login/Login'

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
