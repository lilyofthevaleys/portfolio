import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.glb'],
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // The app used to emit as a single ~5MB chunk, so the browser parsed
    // three.js and the physics engine before it could paint anything.
    //
    // Assign by module path rather than by package name: the name-list form let
    // React get swallowed into the three.js chunk, which then had to load
    // eagerly and defeated the whole split.
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // Vite's dynamic-import preload helper is a virtual module. Left to
          // Rollup it landed inside vendor-three, so the entry imported that
          // chunk just to reach a 20-line helper and the browser fetched all
          // 3.3MB of three.js on first paint. Keep it with the eager vendor.
          if (id.includes('vite/preload-helper')) return 'vendor-react';
          if (!id.includes('node_modules')) return;
          if (/[\\/]node_modules[\\/](react-dom|scheduler)[\\/]/.test(id)) return 'vendor-react';
          if (/[\\/]node_modules[\\/]react[\\/]/.test(id)) return 'vendor-react';
          if (/[\\/]node_modules[\\/](three|@react-three|@dimforge|meshline|postprocessing)/.test(id)) return 'vendor-three';
          if (/[\\/]node_modules[\\/](framer-motion|motion-dom|motion-utils|gsap)/.test(id)) return 'vendor-motion';
          return;
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
});
