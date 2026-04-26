import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApplicationDevelopmentPage } from "./pages/capabilities/ApplicationDevelopmentPage.jsx";
import { DataAnalyticsPage } from "./pages/capabilities/DataAnalyticsPage.jsx";
import { RecordsManagementPage } from "./pages/capabilities/RecordsManagementPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/capabilities/application-development" element={<ApplicationDevelopmentPage />} />
                <Route path="/capabilities/data-analytics" element={<DataAnalyticsPage />} />
                <Route path="/capabilities/records-management" element={<RecordsManagementPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}
