import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const PWAOptions = {
  strategies: "injectManifest",
  srcDir: "src",
  filename: "service-worker.ts",

  includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
  registerType: "autoUpdate",
  manifest: {
    name: "My Awesome App",
    short_name: "MyApp",
    description: "My Awesome App description",
    theme_color: "#ffffff",
    icons: [
      {
        src: "pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  devOptions: {
    enabled: true,
  },
  injectRegister: "auto",
} as VitePWAOptions;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(PWAOptions)],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
