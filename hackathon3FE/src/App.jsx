import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { checkSession, createSession } from "./api/session";

import Header from "./components/Header";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import SkinResult from "./pages/SkinResult";
import DDayEnd from "./pages/DDayEnd";
import Mypage from "./pages/Mypage";
import NotFound from "./pages/NotFound";
import SkinSurvey from "./pages/SkinSurvey";

function AppShell() {
  const location = useLocation();

  const isImmersive = ["/", "/onboarding", "/skin-survey"].includes(
    location.pathname,
  );

  return (
    <div className="app-outer min-h-screen flex items-center justify-center bg-gray-50 md:bg-gray-900">
      <div className="app-frame flex h-[844px] w-full max-w-[420px] flex-col overflow-hidden rounded-[1rem] border border-white/5 bg-white text-gray-800 shadow-2xl">
        {!isImmersive && <Header />}

        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto px-0 py-0">
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/home" element={<Home />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/skin-survey" element={<SkinSurvey />} />
            <Route path="/skin-result" element={<SkinResult />} />
            <Route path="/d-dayend" element={<DDayEnd />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {!isImmersive && <Navbar />}
      </div>
    </div>
  );
}

function App() {
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function ensureSession() {
      try {
        let session;

        try {
          // 기존 세션 확인
          session = await checkSession();

          console.log("existing session", session);
        } catch (error) {
          // 세션이 존재하지 않는 경우 새 세션 생성
          if (error.response?.status === 404) {
            console.log("session not found. creating new session...");

            session = await createSession();

            console.log("new session created", session);
          } else {
            // 404 이외의 에러는 상위 catch에서 처리
            throw error;
          }
        }

        console.log("session initialized", session);
      } catch (error) {
        console.error("Failed to initialize session", error);
      } finally {
        if (isMounted) {
          setSessionReady(true);
        }
      }
    }

    ensureSession();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!sessionReady) {
    return null;
  }

  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
