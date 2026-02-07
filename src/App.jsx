import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Posts from './pages/Posts/index';
import PostDetail from './pages/Posts/PostDetail';
import Projects from './pages/Projects';
import Meta from './components/Meta';
import SearchModal from './components/SearchModal';

function App() {
  return (
    <div className="container">
      <Meta />
      <SearchModal />
      <Header />

      <main style={{ flex: 1, width: '100%' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:slug" element={<PostDetail />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
