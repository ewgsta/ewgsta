import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import 'highlight.js/styles/github-dark.css';
import { getProjects } from '../../utils/content';
import { projectsSlug, backToProjectsLabel } from '../../data/siteData';
import SEO from '../../components/SEO';
import Divider from '../../components/Divider';
import Comments from '../../components/Comments';
import type { Project } from '../../types';

const ProjectDetail = () => {
    const { slug } = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProject() {
            try {
                const allProjects = await getProjects();
                const found = allProjects.find(p => p.slug === slug);
                if (found) {
                    setProject(found);
                }
            } catch (e) {
                // Proje yükleme hatası
            } finally {
                setLoading(false);
            }
        }
        loadProject();
    }, [slug]);

    if (loading) return <div style={{ padding: '40px 0', color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>Loading...</div>;

    if (!project) {
        return (
            <>
                <SEO title="Project Not Found" noIndex={true} />
                <div>Project not found</div>
            </>
        );
    }

    return (
        <>
            <SEO
                title={project.name}
                description={project.desc || project.name}
            />
            <article className="post-detail-container">
                <div style={{ marginBottom: '32px' }}>
                    <Link
                        to={`/${projectsSlug}`}
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
                        {backToProjectsLabel.replace('← ', '')}
                    </Link>
                </div>

                <h1 className="post-detail-title">{project.name}</h1>

                <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {project.tech && project.tech.length > 0 && (
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {project.tech.map((t, i) => (
                                <span key={i} style={{
                                    background: 'var(--secondary)',
                                    color: 'var(--muted-foreground)',
                                    padding: '2px 10px',
                                    borderRadius: 'calc(var(--radius) * 3)',
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                    fontFamily: 'var(--font-mono)',
                                }}>{t}</span>
                            ))}
                        </div>
                    )}

                    {project.link && (
                        <div>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '0.875rem',
                                    color: 'var(--muted-foreground)',
                                    transition: 'color 0.15s ease',
                                    borderBottom: '1px solid var(--border)',
                                    paddingBottom: '1px',
                                }}
                            >
                                Visit Project
                                <ExternalLink size={13} />
                            </a>
                        </div>
                    )}
                </div>

                <div className="markdown-content">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw, rehypeHighlight]}
                    >
                        {project.body || project.content || ''}
                    </ReactMarkdown>
                </div>
            </article>
            <Divider />
            <Comments />
        </>
    );
};

export default ProjectDetail;
