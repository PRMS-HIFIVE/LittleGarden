import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    host: true,
    proxy: {
      '/nongsaro-api': {
        target: 'http://api.nongsaro.go.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nongsaro-api/, ''),
      },
      '/users': {
        target: 'http://localhost:5000',  // 백엔드 서버 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users/, '/users'),
      },
      '/posts': {
      target: 'http://localhost:5000', // 실제 백엔드 주소
      changeOrigin: true,
      },
      '/plants': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    
    },
  },
})