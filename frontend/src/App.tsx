import GlobalStyle from "@/styles/globalStyles";
import AppRouter from "@/router/router"; 
import { useEffect, useState } from "react";

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
      <AppRouter plants={plants} setPlants={setPlants} />
    </>
  );
}

export default App;
