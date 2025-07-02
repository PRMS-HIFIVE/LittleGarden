import Index from "./pages/Index"
import GlobalStyle from "@/styles/globalStyles"
import { Routes, Route } from "react-router-dom"
import UploadPreviewPage from './pages/UploadPreview/UploadPreviewPage';
import PlantRegistrationPage from './pages/PlantRegistrationPage/PlantRegistrationPage';
import { useState, useEffect } from 'react';
import PlantDetailPage from "./pages/PlantDetailPage/PlantDetailPage";
import Login from './pages/Login/Login'
import Join from './pages/Join/Join'
import CommunityDetail from './pages/Community/Detail/Detail'
import Password from './pages/Password/Password'
import Community from './pages/Community/Community'

export interface PlantInfo {
  id: string;
  name: string;
  wateringCycle: number;
  thumbnailUrl: string;
}

function App() {
  const [plants, setPlants] = useState<PlantInfo[]>(() => {
    const savedPlants = sessionStorage.getItem('plants');
    return savedPlants ? JSON.parse(savedPlants) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('plants', JSON.stringify(plants));
  }, [plants]);

  return (
    <>

      <GlobalStyle />
        <Routes>
          <Route path="/" element={<Index plants={plants} setPlants={setPlants} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password" element={<Password />} />
          <Route path="/join" element={<Join />} />
          <Route path="/upload-preview" element={<UploadPreviewPage />} />
          <Route path="/register-plant" element={<PlantRegistrationPage setPlants={setPlants} />} />
          <Route path="/detail/:plantId" element={<PlantDetailPage plants={plants} />} />
          <Route path="/detail" element={<CommunityDetail />} />
          <Route path="/Community" element={<Community />} />
        </Routes>
    
    </>

  )
}

export default App
