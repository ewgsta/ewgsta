import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

function App() {
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
    </div>
  );
}

export default App;
