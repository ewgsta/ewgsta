import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    // Custom plugin to serve /admin from public/admin/index.html
    {
      name: 'admin-redirect',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // If requesting /admin or /admin/ (without index.html), serve admin/index.html
          if (req.url === '/admin' || req.url === '/admin/') {
            req.url = '/admin/index.html'
          }
          next()
        })
      }
    }
  ],
  server: {
    host: '127.0.0.1',
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'public/admin/index.html'),
      },
    },
  },
})