import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Company from "./pages/Company";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Tower from "./pages/Tower";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<Company />} />
        <Route path="/about" element={<Navigate to="/company" replace />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/tower" element={<Tower />} />
        <Route path="/solutions" element={<Home />} />
        <Route path="/case-studies" element={<Company />} />
        <Route path="/news" element={<Home />} />
        <Route path="/legal" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
