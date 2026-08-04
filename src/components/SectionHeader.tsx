interface SectionHeaderProps {
    title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => {
    return (
        <h2 className="section-header">{title}</h2>
    );
};

export default SectionHeader;
