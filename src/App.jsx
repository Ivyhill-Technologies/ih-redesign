import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContractsPage } from "./pages/ContractsPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contracts" element={<ContractsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}
