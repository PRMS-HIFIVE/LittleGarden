import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import Loading from "@/pages/Loading/Loading";
import { useAuthStore } from "@/store/authStore";
import { checkAuth } from "@/apis/auth.api";
import MyPage from "@/pages/MyPage/MyPage";

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
const CommunityWrite = lazy(
  () => import("@/pages/Community/CommunityWrite/CommunityWrite")
);
const Diary = lazy(() => import("@/pages/Diary/Diary"));
const DiaryList = lazy(() => import("@/pages/Diary/DiaryList/DiaryList"));
const DiaryWrite = lazy(() => import("@/pages/Diary/DiaryWrite/DiaryWrite"));
const DiaryDetail = lazy(() => import("@/pages/Diary/DiaryDetail/DiaryDetail"))
const NoticePage = lazy(() => import("@/pages/Notice/NoticePage"));
const AlertSetting = lazy(() => import("@/pages/AlertSetting/AlertSetting"));

const AppRouter = () => {
  const { setAuthenticated, resetAuth, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
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
    } catch (error: unknown) {
      console.error("인증 실패:", error);

      if (error instanceof Error) {
        const errWithStatus = error as Error & { status?: number };

        if (errWithStatus.status === 409 || errWithStatus.message.includes("인증토큰이 없습니다")) {
          resetAuth();
          navigate("/login", { replace: true });
          return;
        }
      }

      resetAuth();
    } finally {
      useAuthStore.getState().setInitialized(true);
      setLoading(false);
    }
  };

  verify();
}, [navigate, resetAuth, setAuthenticated]);


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
          <Route path="latest" element={<DiaryList viewMode="latest" />} />
          {/* <Route path="photo" element={<PhotoOnly />} /> */}
        </Route>
        <Route path="/diary/:id" element={<DiaryDetail />} />
        <Route path="/diary/write" element={<DiaryWrite />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/alert" element={<AlertSetting />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
