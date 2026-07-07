import React, { useEffect } from 'react';

const Comments = () => {
    useEffect(() => {
        const initGiscus = () => {
            const script = document.createElement('script');
            script.src = 'https://giscus.app/client.js';
            script.async = true;
            script.crossOrigin = 'anonymous';
            
            script.setAttribute('data-repo', 'ewgsta/ewgsta'); 
            script.setAttribute('data-repo-id', 'R_kgDOQTf2AQ'); 
            script.setAttribute('data-category', 'General');
            script.setAttribute('data-category-id', 'DIC_kwDOQTf2Ac4DAt7R'); 
            script.setAttribute('data-mapping', 'pathname');
            script.setAttribute('data-strict', '1');
            script.setAttribute('data-reactions-enabled', '1');
            script.setAttribute('data-emit-metadata', '0');
            script.setAttribute('data-input-position', 'top');
            script.setAttribute('data-theme', 'preferred_color_scheme');
            script.setAttribute('data-lang', 'en');
            script.setAttribute('data-loading', 'lazy');
            
            const commentsDiv = document.getElementById('giscus');
            if (commentsDiv) {
                commentsDiv.appendChild(script);
            }
        };

        initGiscus();
    }, []);

    return (
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px dashed #333' }}>
            <div id="giscus"></div>
        </div>
    );
};

export default Comments;
