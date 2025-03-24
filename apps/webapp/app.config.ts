import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "@tanstack/react-start/config";
import tsConfigPaths from "vite-tsconfig-paths";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  server: {
    preset: "netlify",
  },
  tsr: {
    appDirectory: "./src",
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
    resolve: {
      alias: [
        // TODO: This should be done automatically
        {
          find: "@acme/ui",
          replacement: path.resolve(__dirname, "../../packages/ui/src"),
        },
      ],
    },
  },
});
