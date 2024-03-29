import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  build: {
    outDir: "../../.Net APis/GatherSpot.API/GatherSpot.API/wwwroot",
  },
});
