import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutPage } from "./pages/AboutPage.jsx";
import { ContractsPage } from "./pages/ContractsPage.jsx";
import { ApplicationDevelopmentPage } from "./pages/capabilities/ApplicationDevelopmentPage.jsx";
import { DataAnalyticsPage } from "./pages/capabilities/DataAnalyticsPage.jsx";
import { InformationManagementPage } from "./pages/capabilities/InformationManagementPage.jsx";
import { InfrastructureSupportPage } from "./pages/capabilities/InfrastructureSupportPage.jsx";
import { QueueManagementPage } from "./pages/capabilities/QueueManagementPage.jsx";
import { RecordsManagementPage } from "./pages/capabilities/RecordsManagementPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contracts" element={<ContractsPage />} />
                <Route path="/capabilities/application-development" element={<ApplicationDevelopmentPage />} />
                <Route path="/capabilities/data-analytics" element={<DataAnalyticsPage />} />
                <Route path="/capabilities/information-management" element={<InformationManagementPage />} />
                <Route path="/capabilities/infrastructure-support" element={<InfrastructureSupportPage />} />
                <Route path="/capabilities/queue-management" element={<QueueManagementPage />} />
                <Route path="/capabilities/records-management" element={<RecordsManagementPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}
