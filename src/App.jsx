import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataAnalyticsPage } from "./pages/capabilities/DataAnalyticsPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/capabilities/data-analytics" element={<DataAnalyticsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}
