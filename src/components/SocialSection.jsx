import { useState } from 'react';
import { socialLinks, heroTitle, quoteText, findMeOnLabel } from '../data/siteData';

const SocialSection = () => {
    const [copiedText, setCopiedText] = useState('');

    const handleCopy = (e, value) => {
        e.preventDefault();
        navigator.clipboard.writeText(value);
        setCopiedText(value);
        setTimeout(() => setCopiedText(''), 2000);
    };

    return (
        <section>
            <h2 className="section-header">{heroTitle}</h2>
            <p className="quote-text">{quoteText}</p>

            <div className="social-row">
                <span className="find-me-text">{findMeOnLabel}</span>
                {socialLinks.length > 0 ? (
                    socialLinks.map((link, index) => {
                        if (link.isCopyable) {
                            return (
                                <a 
                                    key={index} 
                                    href="#" 
                                    onClick={(e) => handleCopy(e, link.copyValue || link.url)} 
                                    title={copiedText === (link.copyValue || link.url) ? 'Copied!' : link.platform}
                                    style={{ position: 'relative' }}
                                >
                                    <i className={link.platform}></i>
                                    {copiedText === (link.copyValue || link.url) && (
                                        <span style={{
                                            position: 'absolute',
                                            top: '-25px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            fontSize: '12px',
                                            background: 'var(--surface)',
                                            padding: '2px 6px',
                                            borderRadius: '4px',
                                            color: 'var(--text)',
                                            whiteSpace: 'nowrap',
                                            pointerEvents: 'none',
                                            zIndex: 10
                                        }}>
                                            Copied!
                                        </span>
                                    )}
                                </a>
                            );
                        }
                        return (
                            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" title={link.platform}>
                                <i className={link.platform}></i>
                            </a>
                        );
                    })
                ) : (
                    <span style={{ color: 'var(--text-muted)' }}>No links added yet.</span>
                )}
            </div>
        </section>
    );
};

export default SocialSection;
