import { Amplify } from "aws-amplify";
import { ViteReactSSG } from "vite-react-ssg";
import outputs from "../amplify_outputs.json";
import { routes } from "./App.jsx";
import "./styles/global.css";

export const createRoot = ViteReactSSG({ routes }, ({ isClient }) => {
    if (isClient) {
        Amplify.configure(outputs);
    }
});
