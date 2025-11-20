// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Tạm thời COMMENT DÒNG NÀY TRONG KHI DEBUG DEV MODE
  // base: './', 
  
  server: {
    host: '0.0.0.0', 
    port: 5173,
    allowedHosts: [
      'tohue.net', 
      'localhost', 
      '127.0.0.1' 
    ],
  }
})