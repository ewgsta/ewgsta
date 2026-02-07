import React from 'react';
import PostList from '../components/PostList';
import ProjectList from '../components/ProjectList';
import SocialSection from '../components/SocialSection';
import Divider from '../components/Divider';
import { posts } from '../data/posts';
import { projects } from '../data/projects';
import { Link } from 'react-router-dom';

const Home = () => {
    // Show only the first 10 posts on the home page styling, or all if preferred.
    // The original code had 10.
    const recentPosts = posts.slice(0, 10);
    const pinnedProjects = projects.filter(p => p.isPinned);

    return (
        <>
            <SocialSection />
            <Divider />
            <ProjectList projects={pinnedProjects} />
            <div style={{ marginTop: '10px' }}>
                <Link to="/projects" className="read-more-link" style={{ fontSize: '0.9rem' }}>View All Projects →</Link>
            </div>
            <Divider />
            <PostList posts={recentPosts} />
            <Divider />
        </>
    );
};

export default Home;
