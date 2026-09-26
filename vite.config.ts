import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig(({ command }) => ({
  // GitHub Pages 배포 경로는 build에만 적용 — dev는 루트에서 서빙
  base: command === 'build' ? '/aboutMe/' : '/',
  plugins: [
    react(),
    ViteImageOptimizer({
      // webp를 test에서 뺀다 — sharp가 애니메이션 webp를 첫 프레임만 남기고
      // 납작하게 만든다(1.4MB → 18kB, 재생이 사라짐). 이미 압축된 포맷이라
      // 다시 돌려서 얻는 것도 적다.
      test: /\.(jpe?g|png|gif|tiff|svg|avif)$/i,
      jpeg: { quality: 80 },
      png: { quality: 80 },
      // avif: { quality: 80 },
    }),
  ],
}))
