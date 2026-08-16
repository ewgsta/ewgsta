import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft } from 'lucide-react';
import { posts } from '../../data/posts';
import 'highlight.js/styles/atom-one-dark.css';
import Comments from '../../components/Comments';
import { postsSlug, backToPostsLabel } from '../../data/siteData';
import SEO from '../../components/SEO';
import Divider from '../../components/Divider';

const PostDetail = () => {
    const { slug } = useParams();
    const post = posts.find(p => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return (
            <>
                <SEO title="Post Not Found" noIndex={true} />
                <div style={{ padding: '40px 0' }}>Post not found. <Link to={`/${postsSlug}`}>Go back</Link></div>
            </>
        );
    }

    return (
        <>
            <SEO
                title={post.title}
                description={post.description || post.title}
                image={post.thumbnail}
                type="article"
            />
            <article style={{ paddingBottom: '60px' }}>
                <div style={{ marginBottom: '32px' }}>
                    <Link
                        to={`/${postsSlug}`}
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
                        {backToPostsLabel.replace('← ', '')}
                    </Link>
                </div>

                <header style={{ marginBottom: '40px', borderBottom: '1px solid var(--border)', paddingBottom: '24px' }}>
                    <h1 className="post-detail-title">{post.title}</h1>
                    <span style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{post.date}</span>
                </header>

                <div className="markdown-content">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw, rehypeHighlight]}
                        components={{
                            h1: ({ node, ...props }) => <h1 style={{ color: 'var(--foreground)', fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 700, letterSpacing: '-0.02em' }} {...props} />,
                            h2: ({ node, ...props }) => <h2 style={{ color: 'var(--foreground)', fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: 600, letterSpacing: '-0.02em' }} {...props} />,
                            h3: ({ node, ...props }) => <h3 style={{ color: 'var(--foreground)', fontSize: '1.1rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: 600 }} {...props} />,
                            p: ({ node, ...props }) => <p style={{ marginBottom: '1.25rem', lineHeight: '1.8', color: 'var(--foreground)' }} {...props} />,
                            a: ({ node, ...props }) => <a style={{ color: 'var(--foreground)', textDecoration: 'underline', textUnderlineOffset: '3px', textDecorationColor: 'var(--muted-foreground)' }} {...props} />,
                            blockquote: ({ node, ...props }) => (
                                <blockquote style={{
                                    borderLeft: '2px solid var(--border)',
                                    paddingLeft: '1rem',
                                    color: 'var(--muted-foreground)',
                                    margin: '1.5rem 0',
                                    fontStyle: 'italic'
                                }} {...props} />
                            ),
                            table: ({ node, ...props }) => (
                                <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }} {...props} />
                                </div>
                            ),
                            th: ({ node, ...props }) => <th style={{ borderBottom: '1px solid var(--border)', padding: '10px', color: 'var(--foreground)', fontWeight: 600, fontSize: '0.875rem' }} {...props} />,
                            td: ({ node, ...props }) => <td style={{ borderBottom: '1px solid var(--border)', padding: '10px', fontSize: '0.875rem' }} {...props} />,
                            img: ({ node, ...props }) => <img style={{ maxWidth: '100%', borderRadius: 'var(--radius)', margin: '24px 0', border: '1px solid var(--border)' }} {...props} />,
                            code: ({ node, className, children, ...props }) => {
                                const match = /language-(\w+)/.exec(className || '')
                                const inline = (props as { inline?: boolean }).inline
                                return !inline && match ? (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                ) : (
                                    <code style={{ backgroundColor: 'var(--secondary)', padding: '2px 6px', borderRadius: 'calc(var(--radius) * 0.5)', fontSize: '0.85em', fontFamily: 'var(--font-mono)' }} {...props}>
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
            <Divider />
        </>
    );
};

export default PostDetail;
