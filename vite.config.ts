import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import nodePolyfills from "rollup-plugin-polyfill-node";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { defineConfig } from "vitest/config";

const MODE = process.env.NODE_ENV;
const development = MODE === "development";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    vueJsx(),
    vuetify({
      autoImport: true,
    }),
    development &&
      nodePolyfills({
        include: [
          "node_modules/**/*.js",
          new RegExp("node_modules/.vite/.*js"),
        ],
      }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      //
      crypto: "crypto-browserify",
      stream: "stream-browserify",
      assert: "assert",
    },
  },
  build: {
    rollupOptions: {
      plugins: [nodePolyfills()],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
