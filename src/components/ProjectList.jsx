import ProjectItem from './ProjectItem';
import SectionHeader from './SectionHeader';
import { projectsLabel } from '../data/siteData';

const ProjectList = ({ projects }) => {
    return (
        <section>
            <SectionHeader title={projectsLabel} />
            <ul className="project-list">
                {projects.map((project, index) => (
                    <ProjectItem key={index} name={project.name} desc={project.desc} link={project.link} />
                ))}
            </ul>
        </section>
    );
};

export default ProjectList;
