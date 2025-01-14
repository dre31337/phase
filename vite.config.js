import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";

export default defineConfig({
  publicDir: "static",
  server: {
    port: 8080,
  },
  plugins: [
    glsl(),
  ],
  build: {
    target: "esnext",
  }
});
