import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { posts } from '../../data/posts';
import 'highlight.js/styles/atom-one-dark.css'; // Syntax highlighting theme
import Comments from '../../components/Comments';

const PostDetail = () => {
    const { slug } = useParams();
    const post = posts.find(p => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return <div style={{ padding: '40px 0' }}>Post not found. <Link to="/posts">Go back</Link></div>;
    }

    return (
        <article style={{ paddingBottom: '60px' }}>
            <div style={{ marginBottom: '30px' }}>
                <Link to="/posts" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>← Back to Posts</Link>
            </div>

            <header style={{ marginBottom: '40px', borderBottom: '1px dashed #333', paddingBottom: '20px' }}>
                <h1 className="post-detail-title">{post.title}</h1>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{post.date}</span>
            </header>

            <div className="markdown-content">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeHighlight]}
                    components={{
                        // Custom renderer for specific elements if needed to match global styles
                        h1: ({ node, ...props }) => <h1 style={{ color: '#fff', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem' }} {...props} />,
                        h2: ({ node, ...props }) => <h2 style={{ color: '#fff', fontSize: '1.3rem', marginTop: '1.8rem', marginBottom: '1rem' }} {...props} />,
                        h3: ({ node, ...props }) => <h3 style={{ color: '#fff', fontSize: '1.15rem', marginTop: '1.5rem', marginBottom: '0.8rem' }} {...props} />,
                        p: ({ node, ...props }) => <p style={{ marginBottom: '1.2rem', lineHeight: '1.8' }} {...props} />,
                        a: ({ node, ...props }) => <a style={{ color: 'var(--accent-pink)', textDecoration: 'underline' }} {...props} />,
                        blockquote: ({ node, ...props }) => (
                            <blockquote style={{
                                borderLeft: '4px solid var(--accent-pink)',
                                paddingLeft: '1rem',
                                color: 'var(--text-muted)',
                                margin: '1.5rem 0',
                                fontStyle: 'italic'
                            }} {...props} />
                        ),
                        table: ({ node, ...props }) => (
                            <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }} {...props} />
                            </div>
                        ),
                        th: ({ node, ...props }) => <th style={{ borderBottom: '1px solid #444', padding: '10px', color: '#fff' }} {...props} />,
                        td: ({ node, ...props }) => <td style={{ borderBottom: '1px solid #333', padding: '10px' }} {...props} />,
                        img: ({ node, ...props }) => <img style={{ maxWidth: '100%', borderRadius: '8px', margin: '20px 0' }} {...props} />,
                        code: ({ node, inline, className, children, ...props }) => {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            ) : (
                                <code style={{ backgroundColor: '#222', padding: '2px 6px', borderRadius: '4px', fontSize: '0.85em', fontFamily: 'monospace' }} {...props}>
                                    {children}
                                </code>
                            )
                        }
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </div>

            <Comments key={slug} />
        </article>
    );
};

export default PostDetail;
