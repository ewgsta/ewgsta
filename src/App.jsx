import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Posts from './pages/Posts/index';
import PostDetail from './pages/Posts/PostDetail';
import Projects from './pages/Projects';
import ProjectDetail from './pages/Projects/ProjectDetail';
import SEO from './components/SEO';
import SearchModal from './components/SearchModal';
import { postsSlug, projectsSlug } from './data/siteData';

const Admin = lazy(() => import('./pages/Admin'));

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <>
        <Routes>
          <Route path="/admin/*" element={
            <Suspense fallback={
              <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#191919' }}>
                <div style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.1)', borderTopColor: 'rgba(255,255,255,0.4)', borderRadius: '50%', animation: 'admin-spin 0.8s linear infinite' }}></div>
                <style>{`@keyframes admin-spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            }>
              <Admin />
            </Suspense>
          } />
        </Routes>
        <Analytics />
        <SpeedInsights />
      </>
    );
  }

  return (
    <div className="container">
      <SEO />
      <SearchModal />
      <Header />

      <main style={{ flex: 1, width: '100%' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/${postsSlug}`} element={<Posts />} />
          <Route path={`/${postsSlug}/:slug`} element={<PostDetail />} />
          <Route path={`/${projectsSlug}`} element={<Projects />} />
          <Route path={`/${projectsSlug}/:slug`} element={<ProjectDetail />} />
        </Routes>
      </main>

      <Footer />

      {/* Vercel Analytics & Speed Insights */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
