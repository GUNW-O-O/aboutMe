import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig(({ command }) => ({
  // GitHub Pages 배포 경로는 build에만 적용 — dev는 루트에서 서빙
  base: command === 'build' ? '/aboutMe/' : '/',
  plugins: [
    react(),
    ViteImageOptimizer({
      jpeg: { quality: 80 },
      png: { quality: 80 },
      webp: { quality: 75 },
      // avif: { quality: 80 },
    }),
  ],
}))
