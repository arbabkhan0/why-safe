import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import UrlAnalyzer from "./pages/UrlAnalyzer";
import MessageAnalyzer from "./pages/MessageAnalyzer";
import IdentityAnalyzer from "./pages/IdentityAnalyzer";
import QrAnalyzer from "./pages/QrAnalyzer";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/url" element={<UrlAnalyzer />} />
        <Route path="/message" element={<MessageAnalyzer />} />
        <Route path="/identity" element={<IdentityAnalyzer />} />
        <Route path="/qr" element={<QrAnalyzer />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
