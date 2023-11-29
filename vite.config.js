import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Replace '0.0.0.0' with your local IPv4 address
const host = "0.0.0.0";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: host,
  },
});
