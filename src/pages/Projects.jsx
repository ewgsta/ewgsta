import React, { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import ProjectItem from '../components/ProjectItem';
import { projects } from '../data/projects';
import Divider from '../components/Divider';
import { Link } from 'react-router-dom';
import { viewAllProjectsLabel } from '../data/siteData';

const Projects = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 5;

    // Logic for displaying projects
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section>
            <div style={{ marginBottom: '30px' }}>
                <Link to="/" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>← Back to Home</Link>
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

            {/* Pagination Controls */}
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
    );
};

export default Projects;
