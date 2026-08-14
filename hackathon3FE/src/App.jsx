import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import SkinResult from "./pages/SkinResult";
import DDayEnd from "./pages/DDayEnd";
import Mypage from "./pages/Mypage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="app-outer min-h-screen flex items-center justify-center p-6 bg-gray-50 md:bg-gray-900">
        <div className="app-frame w-full md:w-[420px] max-w-full h-auto md:h-[844px] bg-white text-gray-800 md:shadow-2xl md:rounded-2xl overflow-auto md:border md:border-white/5 md:overflow-hidden">
          <header className="bg-white sticky top-0 shadow-sm">
            <div className="px-4 py-4 flex items-center gap-4">
              <h1 className="text-lg font-semibold">LikeLion SkinCare</h1>
              <nav className="flex gap-2 text-xs">
                <Link to="/" className="text-blue-600">
                  홈
                </Link>
                <Link to="/onboarding" className="text-blue-600">
                  온보딩
                </Link>
                <Link to="/skin-result" className="text-blue-600">
                  피부결과
                </Link>
                <Link to="/d-dayend" className="text-blue-600">
                  D-Day 종료
                </Link>
                <Link to="/mypage" className="text-blue-600">
                  마이페이지
                </Link>
              </nav>
            </div>
          </header>

          <main className="px-4 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/skin-result" element={<SkinResult />} />
              <Route path="/d-dayend" element={<DDayEnd />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
