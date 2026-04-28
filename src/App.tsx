import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { PreloaderProvider } from "./context/PreloaderContext";
import Company from "./pages/Company";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Industries from "./pages/Industries";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import Tower from "./pages/Tower";

function App() {
  return (
    <BrowserRouter>
      <PreloaderProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/about" element={<Navigate to="/company" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/tower" element={<Tower />} />
          <Route path="/solutions" element={<Home />} />
          <Route path="/case-studies" element={<Company />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsArticle />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/legal" element={<Contact />} />
        </Routes>
      </PreloaderProvider>
    </BrowserRouter>
  );
}

export default App;
