import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "@/pages/Loading/Loading";
import { useAuthStore } from "@/store/authStore";

const Index = lazy(() => import("@/pages/Index"));
const UploadPreviewPage = lazy(
  () => import("@/pages/UploadPreview/UploadPreviewPage")
);
const PlantRegistrationPage = lazy(
  () => import("@/pages/PlantRegistrationPage/PlantRegistrationPage")
);
const PlantDetailPage = lazy(
  () => import("@/pages/PlantDetailPage/PlantDetailPage")
);
const Login = lazy(() => import("@/pages/Login/Login"));
const Join = lazy(() => import("@/pages/Join/Join"));
const Password = lazy(() => import("@/pages/Password/Password"));
const Community = lazy(() => import("@/pages/Community/Community"));
const CommunityDetail = lazy(() => import("@/pages/Community/Detail/Detail"));

const AppRouter = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={token ? <Index /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={token ? <Navigate to="/" replace /> : <Login />}
        />
        <Route path="/password" element={<Password />} />
        <Route path="/join" element={<Join />} />
        <Route path="/upload-preview" element={<UploadPreviewPage />} />
        <Route path="/register-plant" element={<PlantRegistrationPage />} />
        <Route path="/detail/:plantId" element={<PlantDetailPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/:id" element={<CommunityDetail />} />


      </Routes>
    </Suspense>
  );
};

export default AppRouter;
