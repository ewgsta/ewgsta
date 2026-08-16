import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projectsSlug } from '../data/siteData';

interface ProjectItemProps {
    name: string;
    desc: string;
    link: string;
    slug?: string;
    showReadMore?: boolean;
}

const ProjectItem = ({ name, desc, link, slug, showReadMore }: ProjectItemProps) => {
    return (
        <li className="project-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ width: '100%' }}>
                <a href={link || "#"} target="_blank" rel="noopener noreferrer" className="project-name">{name}</a>
                <span className="project-desc">
                    {desc}
                    {showReadMore && slug && (
                        <>
                            {' '}
                            <Link
                                to={`/${projectsSlug}/${slug}`}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '2px',
                                    fontSize: '0.8em',
                                    color: 'var(--muted-foreground)',
                                    transition: 'color 0.15s ease'
                                }}
                            >
                                <ArrowRight size={12} />
                            </Link>
                        </>
                    )}
                </span>
            </div>
        </li>
    );
};

export default ProjectItem;
