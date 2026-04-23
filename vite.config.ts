import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/chat/',
  server: {
    port: 5173,
    proxy: {
      '/api/v2/oauth': {
        target: 'https://ngw.devices.sberbank.ru:9443',
        changeOrigin: true,
        secure: false,
        headers: {
          'Origin': 'https://ngw.devices.sberbank.ru:9443'
        }
      },
      '/api/v1/chat/completions': {
        target: 'https://gigachat.devices.sberbank.ru',
        changeOrigin: true,
        secure: false,
        headers: {
          'Origin': 'https://gigachat.devices.sberbank.ru'
        }
      }
    }
  }
})
