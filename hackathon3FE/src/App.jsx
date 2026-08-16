import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import SkinResult from "./pages/SkinResult";
import DDayEnd from "./pages/DDayEnd";
import Mypage from "./pages/Mypage";
import ConcernNew from "./pages/ConcernNew";
import ConcernHistory from "./pages/ConcernHistory";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="app-outer min-h-screen flex items-center justify-center bg-gray-50 md:bg-gray-900">
        <div className="app-frame flex flex-col w-full md:w-[420px] max-w-full h-auto md:h-[844px] bg-white text-gray-800 md:shadow-2xl md:rounded-2xl overflow-hidden md:border md:border-white/5">
          <Header />

          <main className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/skin-result" element={<SkinResult />} />
              <Route path="/d-dayend" element={<DDayEnd />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/concern-input" element={<ConcernNew />} />
              <Route path="/concern-history" element={<ConcernHistory />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Navbar />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
