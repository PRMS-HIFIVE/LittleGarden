import Index from "./pages/Index"
import { Routes, Route } from 'react-router-dom';
import UploadPreviewPage from './pages/UploadPreviewPage';
import PlantRegistrationPage from './pages/PlantRegistrationPage';
import { useState, useEffect } from 'react';
import PlantDetailPage from "./pages/PlantDetailPage";

export interface PlantInfo {
  id: string;
  name: string;
  wateringCycle: number;
  thumbnailUrl: string;
}

function App() {
  // 앱이 처음 로드될 때 sessionStorage에서 데이터를 가져와 초기 상태를 설정합니다.
  const [plants, setPlants] = useState<PlantInfo[]>(() => {
    const savedPlants = sessionStorage.getItem('plants');
    return savedPlants ? JSON.parse(savedPlants) : [];
  });

  // plants 상태가 변경될 때마다 sessionStorage에 자동으로 저장합니다.
  useEffect(() => {
    sessionStorage.setItem('plants', JSON.stringify(plants));
  }, [plants]);

  return (
    <Routes>
      <Route path="/" element={<Index plants={plants} setPlants={setPlants} />} />
      <Route path="/upload-preview" element={<UploadPreviewPage />} />
      <Route path="/register-plant" element={<PlantRegistrationPage setPlants={setPlants} />} />
      <Route path="/detail/:plantId" element={<PlantDetailPage plants={plants} />} />
    </Routes>
  )
}

export default App
