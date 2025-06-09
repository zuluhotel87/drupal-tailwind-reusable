import { glob } from 'glob'
import path from "path";
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from "vite";

const THEME_PATH = './web/themes/custom/shizen';

const port = 5173;
const origin = `${process.env.DDEV_PRIMARY_URL}:${port}`;

export default defineConfig({
  build: {
    outDir: `${THEME_PATH}/dist`,
    manifest: true,
    emptyOutDir: true,
    rollupOptions: {
      input: [
        path.resolve(__dirname, `${THEME_PATH}/src/css/tailwind.css`),
        path.resolve(__dirname, `${THEME_PATH}/src/js/main.js`),
        ...glob.sync(path.resolve(__dirname, `${THEME_PATH}/src/js/components/*.js`)),
      ],
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      }
    },
  },
  plugins: [
    tailwindcss(),
  ],
  server: {
    host: "0.0.0.0",
    port: port,
    strictPort: true,
    origin: origin,
  },
});
