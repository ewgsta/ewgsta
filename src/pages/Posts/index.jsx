import React, { useState } from 'react';
import SectionHeader from '../../components/SectionHeader';
import PostItem from '../../components/PostItem';
import { posts } from '../../data/posts';
import { viewAllPostsLabel, postsLabel } from '../../data/siteData';
import SEO from '../../components/SEO';

const Posts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <SEO
                title={viewAllPostsLabel}
                description={`Tüm ${postsLabel.toLowerCase()} listesi`}
            />
            <section>
                <SectionHeader title={viewAllPostsLabel} />
                <ul className="post-list">
                    {currentPosts.map((post) => (
                        <PostItem
                            key={post.id}
                            date={post.date}
                            title={post.title}
                            slug={post.slug}
                        />
                    ))}
                </ul>

                {totalPages > 1 && (
                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px', fontSize: '0.9rem' }}>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: currentPage === i + 1 ? '#fff' : 'var(--text-muted)',
                                    cursor: 'pointer',
                                    textDecoration: currentPage === i + 1 ? 'underline' : 'none',
                                    padding: '5px'
                                }}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}

                <div style={{ marginBottom: '40px' }}></div>
            </section>
        </>
    );
};

export default Posts;
