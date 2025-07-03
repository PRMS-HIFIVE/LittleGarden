import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import type { PlantInfo } from "@/App";
import Loading from "@/pages/Loading/Loading";

const Index = lazy(() => import("@/pages/Index"));
const UploadPreviewPage = lazy(() => import("@/pages/UploadPreview/UploadPreviewPage"));
const PlantRegistrationPage = lazy(() => import("@/pages/PlantRegistrationPage/PlantRegistrationPage"));
const PlantDetailPage = lazy(() => import("@/pages/PlantDetailPage/PlantDetailPage"));
const Login = lazy(() => import("@/pages/Login/Login"));
const Join = lazy(() => import("@/pages/Join/Join"));
const Password = lazy(() => import("@/pages/Password/Password"));
const Community = lazy(() => import("@/pages/Community/Community"));
const CommunityDetail = lazy(() => import("@/pages/Community/Detail/Detail"));

interface AppRouterProps {
  plants: PlantInfo[];
  setPlants: React.Dispatch<React.SetStateAction<PlantInfo[]>>;
}

const AppRouter = ({ plants, setPlants }: AppRouterProps) => {
  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
};

export default AppRouter;
