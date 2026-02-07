const ProjectItem = ({ name, desc, link }) => {
    return (
        <li className="project-item">
            <a href={link || "#"} target="_blank" rel="noopener noreferrer" className="project-name">{name}</a>
            <span className="project-desc">{desc}</span>
        </li>
    );
};

export default ProjectItem;
