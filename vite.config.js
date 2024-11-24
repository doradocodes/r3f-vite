import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/r3f-vite/',
  build: {
    outDir: 'docs',
    emptyOutDir: true, // also necessary
  }
})
