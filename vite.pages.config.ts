// Plain client-side SPA build for GitHub Pages — bypasses the TanStack Start
// SSR/nitro pipeline entirely (not needed: this app has no server loaders,
// everything renders from local mock data). Run with:
//   npx vite build --config vite.pages.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/gcs-crm/",
  plugins: [tsconfigPaths(), react(), tailwindcss()],
  build: {
    outDir: "dist-pages",
  },
});
