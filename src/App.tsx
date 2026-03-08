import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage, DashboardPage, DocumentationPage, AccuracyPage, CreativityPage, RigettiPage } from "@/pages";
import { SiteLayout } from "@/components/home";
import { ThemeProvider } from "@/context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/documentation" element={<DocumentationPage />} />
            <Route path="/accuracy" element={<AccuracyPage />} />
            <Route path="/creativity" element={<CreativityPage />} />
            <Route path="/rigetti" element={<RigettiPage />} />
          </Route>

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
