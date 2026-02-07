import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'
import { resolve } from 'path'
import fs from 'fs'

// Dynamic routes for sitemap
function getRoutes() {
  const routes = ['/', '/posts', '/projects']

  // Get post slugs
  const postsDir = resolve(__dirname, 'src/content/posts')
  if (fs.existsSync(postsDir)) {
    const postFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
    postFiles.forEach(file => {
      const slug = file.replace('.md', '')
      routes.push(`/posts/${slug}`)
    })
  }

  // Get project slugs
  const projectsDir = resolve(__dirname, 'src/content/projects')
  if (fs.existsSync(projectsDir)) {
    const projectFiles = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'))
    projectFiles.forEach(file => {
      const slug = file.replace('.md', '')
      routes.push(`/projects/${slug}`)
    })
  }

  return routes
}

export default defineConfig({
  plugins: [
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
              // Admin HTML dosyası bulunamadı
            }
          }
          next()
        })
      }
    },
    react(),
    Sitemap({
      hostname: 'https://www.ewgsta.me',
      dynamicRoutes: getRoutes(),
      exclude: ['/admin', '/admin/'],
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
      generateRobotsTxt: true,
      robots: [
        { userAgent: '*', allow: '/' },
        { userAgent: '*', disallow: '/admin' }
      ]
    }),
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