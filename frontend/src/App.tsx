
import MainpageHeader from "@/common/Header/HeaderVariants/MainpageHeader";
import Sidebar from "@/common/Sidebar/Sidebar";

export interface PlantInfo {
  id: string;
  name: string;
  wateringCycle: number;
  thumbnailUrl: string;
}

function App() {


  return (

    <>
      <MainpageHeader></MainpageHeader>
      <Sidebar />
    </>

  )
}

export default App
