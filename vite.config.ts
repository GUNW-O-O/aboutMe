import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  base: '/aboutMe',
  plugins: [
    react(),
    ViteImageOptimizer({
      jpeg: { quality: 80 },
      png: { quality: 80 },
      webp: { quality: 75 },
      // avif: { quality: 80 },
    })
  ],
})
