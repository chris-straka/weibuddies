import { fileURLToPath, URL } from "url";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// I have to use this for k8s because vite expects the
// hmr to happen at port 3000 even though my ingress is serving
// the frontend app off port 80

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    Components({ resolvers: [ElementPlusResolver()] }),
    vue(),
  ],
  server: {
    hmr: {
      host: "localhost",
      port: 80,
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
