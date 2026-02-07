import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';
import { getProjects } from '../../utils/content';
import { projectsSlug, backToProjectsLabel } from '../../data/siteData';
import SEO from '../../components/SEO';
import Divider from '../../components/Divider';

const ProjectDetail = () => {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
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

    if (loading) return <div>Loading...</div>;

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
                <div style={{ marginBottom: '30px' }}>
                    <Link to={`/${projectsSlug}`} style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{backToProjectsLabel}</Link>
                </div>

                <h1 className="post-detail-title">{project.name}</h1>

                <div className="project-meta" style={{ marginBottom: '20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {project.tech && project.tech.length > 0 && (
                        <div className="tech-stack" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {project.tech.map((t, i) => (
                                <span key={i} className="tech-badge" style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontSize: '0.8rem'
                                }}>{t}</span>
                            ))}
                        </div>
                    )}

                    {project.link && (
                        <div style={{ marginTop: '10px' }}>
                            <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'var(--accent-pink)' }}>
                                Visit Project <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.8rem' }}></i>
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
        </>
    );
};

export default ProjectDetail;
