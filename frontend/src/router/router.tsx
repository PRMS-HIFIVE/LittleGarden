import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import Loading from "@/pages/Loading/Loading";
import { useAuthStore } from "@/store/authStore";
import { checkAuth } from "@/apis/auth.api";

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
const CommunityWrite = lazy(() => import("@/pages/Community/CommunityWrite/CommunityWrite"));
const Diary = lazy(() => import("@/pages/Diary/Diary"));
const DiaryList = lazy(() => import("@/pages/Diary/DiaryList/DiaryList"));
const DiaryWrite = lazy(() => import("@/pages/Diary/DiaryWrite/DiaryWrite"));
const NoticePage = lazy(() => import("@/pages/Notice/NoticePage"));

const AppRouter = () => {
  const { setAuthenticated, resetAuth, isAuthenticated } = useAuthStore();

  const [loading, setLoading] = useState(true);

// useEffect(() => {
//   const verify = async () => {
//     try {
//       const localUser = localStorage.getItem("user");
//       if (localUser) {
//         const parsedUser = JSON.parse(localUser);
//         useAuthStore.getState().setUser(parsedUser);
//       }

//       await checkAuth();
//       setAuthenticated(true);
//     } catch (err) {
//       console.error("인증 실패:", err);
//       resetAuth();
//     } finally {
//       setLoading(false);
//     }
//   };

//   verify();
// }, []);

useEffect(() => {
  const verify = async () => {
    try {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        const parsedUser = JSON.parse(localUser);
        useAuthStore.getState().setUser(parsedUser);
      }

      await checkAuth();
      setAuthenticated(true);
    } catch (err) {
      console.error("인증 실패:", err);
      resetAuth();
    } finally {
      useAuthStore.getState().setInitialized(true);  // 여기서 초기화 완료 상태 설정
      setLoading(false);
    }
  };

  verify();
}, []);


  if (loading) return <div>로딩 중...</div>;

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Index /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />

        <Route path="/password" element={<Password />} />
        <Route path="/join" element={<Join />} />

        <Route path="/upload-preview" element={<UploadPreviewPage />} />
        <Route path="/register-plant" element={<PlantRegistrationPage />} />
        <Route path="/detail/:plantId" element={<PlantDetailPage />} />

        <Route path="/community" element={<Community />} />
        <Route path="/community/:id" element={<CommunityDetail />} />
        <Route path="/community/write" element={<CommunityWrite />} />
        
        <Route path="/diary" element={<Diary />}>
          <Route path="latest" element={<DiaryList />} />
          {/* <Route path="photo" element={<PhotoOnly />} /> */}
        </Route>
        <Route path="/diary/write" element={<DiaryWrite />} />
        <Route path="/notice" element={<NoticePage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
