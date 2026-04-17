import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/gamejob-adcenter/',   // ← 이 줄만 추가
  server: { port: 3000 },
  build: { outDir: 'dist' },
})