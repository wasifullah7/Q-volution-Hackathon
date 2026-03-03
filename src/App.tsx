import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage, DashboardPage, DocumentationPage, AccuracyPage } from "@/pages";
import { ThemeProvider } from "@/context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
          <Route path="/accuracy" element={<AccuracyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
