import Index from "./pages/Index"
import { Routes, Route } from 'react-router-dom';
import UploadPreviewPage from './pages/UploadPreviewPage';
import PlantRegistrationPage from './pages/PlantRegistrationPage';
import { useState } from 'react';

export interface PlantInfo {
  id: string;
  name: string;
  wateringCycle: number;
  thumbnailUrl: string;
}

function App() {
  const [plants, setPlants] = useState<PlantInfo[]>([]);

  return (
    <Routes>
      <Route path="/" element={<Index plants={plants} setPlants={setPlants} />} />
      <Route path="/upload-preview" element={<UploadPreviewPage />} />
      <Route path="/register-plant" element={<PlantRegistrationPage setPlants={setPlants} />} />
    </Routes>
  )
}

export default App
