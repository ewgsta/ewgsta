import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import {
    siteTitle,
    siteDescription,
    siteUrl,
    siteLanguage,
    siteAuthor,
    siteKeywords,
    ogImage,
    logoUrl
} from '../data/siteData';

const SEO = ({ title, description, image, type = 'website', noIndex = false }) => {
    const location = useLocation();
    const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const pageDescription = description || siteDescription;
    const pageImage = image || ogImage || logoUrl;
    const canonicalUrl = `${siteUrl}${location.pathname}`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <html lang={siteLanguage} />
            <title>{pageTitle}</title>
            <meta name="title" content={pageTitle} />
            <meta name="description" content={pageDescription} />
            {siteKeywords && <meta name="keywords" content={siteKeywords} />}
            <meta name="author" content={siteAuthor} />
            <link rel="canonical" href={canonicalUrl} />
            {noIndex && <meta name="robots" content="noindex, nofollow" />}

            {/* Favicon */}
            <link rel="icon" type="image/png" href={logoUrl} />
            <link rel="apple-touch-icon" href={logoUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDescription} />
            <meta property="og:image" content={pageImage} />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:locale" content={siteLanguage === 'tr' ? 'tr_TR' : 'en_US'} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={pageDescription} />
            <meta name="twitter:image" content={pageImage} />

            {/* Additional SEO */}
            <meta name="theme-color" content="#121212" />
            <meta name="msapplication-TileColor" content="#121212" />
        </Helmet>
    );
};

export default SEO;
