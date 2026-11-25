import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: { port: 5173, host: true },
    // Build-time version stamp shown in the footer. Amplify sets AWS_COMMIT_ID.
    define: {
        __COMMIT__: JSON.stringify((process.env.AWS_COMMIT_ID || "dev").slice(0, 7)),
        __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
    },
});
