import { AboutPage } from "./pages/AboutPage.jsx";
import { AIPage } from "./pages/AIPage.jsx";
import { ContactPage } from "./pages/ContactPage.jsx";
import { ContractsPage } from "./pages/ContractsPage.jsx";
import { ApplicationDevelopmentPage } from "./pages/capabilities/ApplicationDevelopmentPage.jsx";
import { DataAnalyticsPage } from "./pages/capabilities/DataAnalyticsPage.jsx";
import { InformationManagementPage } from "./pages/capabilities/InformationManagementPage.jsx";
import { InfrastructureSupportPage } from "./pages/capabilities/InfrastructureSupportPage.jsx";
import { QueueManagementPage } from "./pages/capabilities/QueueManagementPage.jsx";
import { RecordsManagementPage } from "./pages/capabilities/RecordsManagementPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";

export const routes = [
    { path: "/", Component: HomePage },
    { path: "/about", Component: AboutPage },
    { path: "/ai", Component: AIPage },
    { path: "/contracts", Component: ContractsPage },
    { path: "/contact", Component: ContactPage },
    { path: "/capabilities/application-development", Component: ApplicationDevelopmentPage },
    { path: "/capabilities/data-analytics", Component: DataAnalyticsPage },
    { path: "/capabilities/information-management", Component: InformationManagementPage },
    { path: "/capabilities/infrastructure-support", Component: InfrastructureSupportPage },
    { path: "/capabilities/queue-management", Component: QueueManagementPage },
    { path: "/capabilities/records-management", Component: RecordsManagementPage },
    { path: "*", Component: NotFoundPage },
];
