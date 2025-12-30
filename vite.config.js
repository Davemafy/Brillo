import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  server: {
    host: true,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      }
    }
  },
  plugins: [
    TanStackRouterVite(),
    tailwindcss(),
    react(),
  ],
});
