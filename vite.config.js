import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

export default defineConfig({
  plugins: [
    // Admin redirect plugin - runs BEFORE other middlewares (no return statement)
    {
      name: 'admin-static-serve',
      enforce: 'pre',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/admin' || req.url === '/admin/' || req.url?.startsWith('/admin/index.html')) {
            const adminHtmlPath = resolve(__dirname, 'public/admin/index.html')
            try {
              const html = fs.readFileSync(adminHtmlPath, 'utf-8')
              res.setHeader('Content-Type', 'text/html')
              res.statusCode = 200
              res.end(html)
              return
            } catch (e) {
              console.error('Failed to serve admin HTML:', e)
            }
          }
          next()
        })
      }
    },
    react(),
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