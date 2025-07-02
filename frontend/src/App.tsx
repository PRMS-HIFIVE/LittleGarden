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
  const [plants, setPlants] = useState<PlantInfo[]>(() => {
    const savedPlants = sessionStorage.getItem('plants');
    return savedPlants ? JSON.parse(savedPlants) : [];
  });

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
