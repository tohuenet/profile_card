// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // 🔽 THÊM HOẶC CHỈNH SỬA BASE PATH NÀY 
  base: './', // Sử dụng đường dẫn tương đối. Khắc phục 90% lỗi deploy.
  
  // Hoặc nếu bạn biết chắc chắn thư mục con của mình:
  // base: '/profile_card/', 
  
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