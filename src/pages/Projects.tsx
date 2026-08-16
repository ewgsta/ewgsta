import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ProjectItem from '../components/ProjectItem';
import { projects } from '../data/projects';
import { Link } from 'react-router-dom';
import { viewAllProjectsLabel, projectsLabel, backToHomeLabel } from '../data/siteData';
import SEO from '../components/SEO';
import Divider from '../components/Divider';

const Projects = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 5;

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <SEO
                title={viewAllProjectsLabel}
                description={`Tüm ${projectsLabel.toLowerCase()} listesi`}
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

                <SectionHeader title={viewAllProjectsLabel} />
                <ul className="project-list">
                    {currentProjects.map((project, index) => (
                        <ProjectItem
                            key={index}
                            name={project.name}
                            desc={project.desc}
                            link={project.link}
                            slug={project.slug}
                            showReadMore={true}
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

export default Projects;
