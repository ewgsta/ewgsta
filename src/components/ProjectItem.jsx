import { Link } from 'react-router-dom';
import { projectsSlug } from '../data/siteData';

const ProjectItem = ({ name, desc, link, slug, showReadMore }) => {
    return (
        <li className="project-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div>
                <a href={link || "#"} target="_blank" rel="noopener noreferrer" className="project-name">{name}</a>
                <span className="project-desc">{desc}</span>
            </div>
            {showReadMore && slug && (
                <Link to={`/${projectsSlug}/${slug}`} style={{ fontSize: '0.8rem', marginTop: '4px', color: 'var(--text-muted)', textDecoration: 'underline' }}>
                    Read more →
                </Link>
            )}
        </li>
    );
};

export default ProjectItem;
