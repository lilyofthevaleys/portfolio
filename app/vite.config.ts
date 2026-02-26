import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  assetsInclude: ['**/*.glb'],
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-animations': ['framer-motion', 'gsap'],
          'vendor-3d': ['react-icon-cloud'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
    target: 'esnext',
    cssCodeSplit: true,
    minify: 'esbuild',
  },
  server: {
    preTransformRequests: true,
  },
});
