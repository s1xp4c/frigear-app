import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        setupFiles: ['dotenv/config'],
        environment: "jsdom",
    },
    resolve:{
        alias: [{ find: '@', replacement: resolve(__dirname, '.') }],
    }
});
