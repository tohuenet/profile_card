import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // 🔽 Thêm cấu hình server này 
  server: {
    host: '0.0.0.0', // Lắng nghe trên tất cả các địa chỉ mạng
    port: 5173,     // Có thể giữ nguyên port mặc định hoặc thay đổi nếu cần
  }
})