import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // This comes from Node.js

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
      alias: {
        // This maps the "@" symbol to your "src" folder
        "@": path.resolve(__dirname, "./src"),
      },
  },
})
