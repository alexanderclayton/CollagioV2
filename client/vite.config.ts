import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '*' : {
        target: 'http://localhost:6001',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
})
