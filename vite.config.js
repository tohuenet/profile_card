import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  server: {
    host: '0.0.0.0', 
    port: 5173,
    
    // 🔽 THÊM DÒNG NÀY ĐỂ CHO PHÉP HOST 'tohue.net'
    allowedHosts: [
      'tohue.net', // Host mà bạn đang cố truy cập
      'localhost', 
      '127.0.0.1' 
    ],
  }
})