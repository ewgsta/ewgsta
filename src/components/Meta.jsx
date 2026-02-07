
import { useEffect } from 'react';
import { siteTitle, logoUrl } from '../data/siteData';

const Meta = () => {
    useEffect(() => {
        // Update Page Title
        document.title = siteTitle;

        // Update Favicon
        const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
        link.type = 'image/png';
        link.rel = 'icon';
        link.href = logoUrl;
        document.getElementsByTagName('head')[0].appendChild(link);
    }, []);

    return null;
};

export default Meta;
