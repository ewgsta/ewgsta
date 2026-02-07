import React, { useState, useEffect } from 'react';
import PostList from '../components/PostList';
import ProjectList from '../components/ProjectList';
import SocialSection from '../components/SocialSection';
import Divider from '../components/Divider';
import { getProjects, getPosts } from '../utils/content';
import { Link } from 'react-router-dom';

const Home = () => {
    const [recentPosts, setRecentPosts] = useState([]);
    const [pinnedProjects, setPinnedProjects] = useState([]);

    useEffect(() => {
        async function loadContent() {
            try {
                const projects = await getProjects();
                const posts = await getPosts();

                // Show first 5 projects
                setPinnedProjects(projects.slice(0, 5));

                // Sort posts by date and take first 10
                setRecentPosts(posts.slice(0, 10));
            } catch (err) {
                console.error("Failed to load content for Home:", err);
            }
        }
        loadContent();
    }, []);

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
