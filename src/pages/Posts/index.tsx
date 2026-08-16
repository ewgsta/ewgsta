import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import SectionHeader from '../../components/SectionHeader';
import PostItem from '../../components/PostItem';
import { posts } from '../../data/posts';
import { viewAllPostsLabel, postsLabel, backToHomeLabel } from '../../data/siteData';
import SEO from '../../components/SEO';
import Divider from '../../components/Divider';
import { Link } from 'react-router-dom';

const Posts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <SEO
                title={viewAllPostsLabel}
                description={`Tüm ${postsLabel.toLowerCase()} listesi`}
            />
            <section>
                <div style={{ marginBottom: '32px' }}>
                    <Link
                        to="/"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '0.875rem',
                            color: 'var(--muted-foreground)',
                            transition: 'color 0.15s ease',
                        }}
                    >
                        <ArrowLeft size={14} />
                        {backToHomeLabel.replace('← ', '')}
                    </Link>
                </div>

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
                    <div style={{ display: 'flex', gap: '2px', marginTop: '24px' }}>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                style={{
                                    background: currentPage === i + 1 ? 'var(--secondary)' : 'transparent',
                                    border: 'none',
                                    color: currentPage === i + 1 ? 'var(--foreground)' : 'var(--muted-foreground)',
                                    cursor: 'pointer',
                                    padding: '6px 12px',
                                    borderRadius: 'var(--radius)',
                                    fontSize: '0.85rem',
                                    fontWeight: currentPage === i + 1 ? 500 : 400,
                                    fontFamily: 'var(--font-mono)',
                                    transition: 'all 0.15s ease',
                                }}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}

                <div style={{ marginBottom: '40px' }}></div>
                <Divider />
            </section>
        </>
    );
};

export default Posts;
