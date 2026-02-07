import { socialLinks, heroTitle, quoteText, findMeOnLabel } from '../data/siteData';

const SocialSection = () => {
    return (
        <section>
            <h2 className="section-header">{heroTitle}</h2>
            <p className="quote-text">{quoteText}</p>

            <div className="social-row">
                <span className="find-me-text">{findMeOnLabel}</span>
                {socialLinks.length > 0 ? (
                    socialLinks.map((link, index) => (
                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" title={link.platform}>
                            <i className={link.platform}></i>
                        </a>
                    ))
                ) : (
                    <span style={{ color: 'var(--text-muted)' }}>No links added yet.</span>
                )}
            </div>
        </section>
    );
};

export default SocialSection;
