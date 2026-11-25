import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./App.jsx";
import { installErrorHandlers } from "./log.js";
import "./styles/global.css";

export const createRoot = ViteReactSSG({ routes }, ({ isClient }) => {
    if (isClient) installErrorHandlers();
});
