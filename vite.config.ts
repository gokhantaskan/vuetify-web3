import { fileURLToPath, URL } from "node:url";

import inject from "@rollup/plugin-inject";
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
          "http",
          "crypto",
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
      external: ["@web3-onboard/*"],
      plugins: [
        nodePolyfills({ include: ["crypto", "http"] }),
        inject({ Buffer: ["Buffer", "Buffer"] }),
      ],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    exclude: ["@ethersproject/hash", "wrtc", "http"],
    include: [
      "@web3-onboard/core",
      "js-sha3",
      "@ethersproject/bignumber",
      "color",
      "mersenne-twister",
    ],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
    },
  },
  define: {
    global: "window",
  },
});
