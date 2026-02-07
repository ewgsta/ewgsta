import { Link } from 'react-router-dom';
import { projectsSlug } from '../data/siteData';

const ProjectItem = ({ name, desc, link, slug, showReadMore }) => {
    return (
        <li className="project-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ width: '100%' }}>
                <a href={link || "#"} target="_blank" rel="noopener noreferrer" className="project-name">{name}</a>
                <span className="project-desc">
                    {desc}
                    {showReadMore && slug && (
                        <>
                            {' '}
                            <Link to={`/${projectsSlug}/${slug}`} style={{ fontSize: '0.9em', color: 'var(--text-muted)', textDecoration: 'underline', whiteSpace: 'nowrap' }}>
                                →
                            </Link>
                        </>
                    )}
                </span>
            </div>
        </li>
    );
};

export default ProjectItem;
