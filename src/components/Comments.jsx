import React, { useEffect } from 'react';

const Comments = () => {
    useEffect(() => {
        const initTwikoo = () => {
            if (window.twikoo) {
                window.twikoo.init({
                    envId: 'https://twikoo-cloudflare.ewgsta.workers.dev',
                    el: '#tcomment',
                    lang: 'en',
                });
            }
        };

        if (window.twikoo) {
            initTwikoo();
        } else {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/twikoo/dist/twikoo.all.min.js';
            script.async = true;
            script.onload = initTwikoo;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px dashed #333' }}>
            <div id="tcomment"></div>
        </div>
    );
};

export default Comments;
