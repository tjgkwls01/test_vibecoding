import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, "index.html"),
        qna: resolve(import.meta.dirname, "qna.html"),
        auth: resolve(import.meta.dirname, "auth.html"),
        signup: resolve(import.meta.dirname, "signup.html"),
        projects: resolve(import.meta.dirname, "projects.html"),
        design: resolve(import.meta.dirname, "design.html"),
        theater: resolve(import.meta.dirname, "theater.html"),
      },
    },
  },
});
