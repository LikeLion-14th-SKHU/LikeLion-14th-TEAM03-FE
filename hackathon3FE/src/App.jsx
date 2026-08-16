import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
  const isImmersive = ["/onboarding", "/skin-survey"].includes(
    location.pathname,
  );

  return (
    <div className="app-outer min-h-screen flex items-center justify-center bg-gray-50 md:bg-gray-900">
      <div className="app-frame flex h-[844px] w-full max-w-[420px] flex-col overflow-hidden rounded-[1rem] border border-white/5 bg-white text-gray-800 shadow-2xl">
        {!isImmersive && <Header />}

        <main className="flex min-h-0 flex-1 flex-col px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
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
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
