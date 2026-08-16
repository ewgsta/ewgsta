import { useState } from 'react';
import { socialLinks, heroTitle, quoteText, findMeOnLabel } from '../data/siteData';

const SocialSection = () => {
    const [copiedText, setCopiedText] = useState('');

    const handleCopy = (e: React.MouseEvent<HTMLAnchorElement>, value: string) => {
        e.preventDefault();
        navigator.clipboard.writeText(value);
        setCopiedText(value);
        setTimeout(() => setCopiedText(''), 2000);
    };

    return (
        <section>
            <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--foreground)',
                letterSpacing: '-0.03em',
                marginBottom: '12px',
                lineHeight: 1.3,
            }}>{heroTitle}</h2>
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
                                            top: '-30px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            fontSize: '0.7rem',
                                            background: 'var(--secondary)',
                                            border: '1px solid var(--border)',
                                            padding: '3px 8px',
                                            borderRadius: 'var(--radius)',
                                            color: 'var(--foreground)',
                                            whiteSpace: 'nowrap',
                                            pointerEvents: 'none',
                                            zIndex: 10,
                                            fontFamily: 'var(--font-mono)',
                                            fontWeight: 500,
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
                    <span style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>No links added yet.</span>
                )}
            </div>
        </section>
    );
};

export default SocialSection;
