export const injectAll = () => {
    if (process.env.NODE_ENV === 'production') {
        createLinks();
        appendHotjar();
        appendGoogleAnalytics();
        removeStaticBundle();
    }
};

const injectLinks = (rel: string, href: string) => {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    document.getElementsByTagName('head')[0].appendChild(link);
};

const createLinks = () => {
    const links = [
        { rel: 'manifest', href: '/tiltaksgjennomforing/manifest.json' },
        { rel: 'shortcut icon', href: '/tiltaksgjennomforing/favicon.ico' },
        { rel: 'stylesheet', href: '/tiltaksgjennomforing/index.css' },
    ];
    links.map((lenker: { rel: string; href: string }) => {
        injectLinks(lenker.rel, lenker.href);
    });
};

const appendHotjar = () => {
    const hotjar = document.createElement('script');
    hotjar.defer = true;
    const inlineScript = document.createTextNode(
        '' +
            ' (function (h, o, t, j, a, r) {\n' +
            '            h.hj =\n' +
            '                h.hj ||\n' +
            '                function () {\n' +
            '                    (h.hj.q = h.hj.q || []).push(arguments);\n' +
            '                };\n' +
            '            h._hjSettings = {hjid: 118350, hjsv: 6};\n' +
            "            a = o.getElementsByTagName('head')[0];\n" +
            "            r = o.createElement('script');\n" +
            '            r.async = 1;\n' +
            '            r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;\n' +
            '            a.appendChild(r);\n' +
            '        })(\n' +
            '            window,\n' +
            '            document,\n' +
            "            'https://static.hotjar.com/c/hotjar-',\n" +
            "            '.js?sv='\n" +
            '        );'
    );
    hotjar.appendChild(inlineScript);
    document.getElementsByTagName('body')[0].appendChild(hotjar);
};

const appendGoogleAnalytics = () => {
    const analytics = document.createElement('script');
    analytics.defer = true;
    const inlineScript = document.createTextNode(
        '' +
            '(function (w, d, s, l, i) {\n' +
            '            w[l] = w[l] || [];\n' +
            '            w[l].push({\n' +
            "                'gtm.start': new Date().getTime(),\n" +
            "                event: 'gtm.js',\n" +
            '            });\n' +
            '            var f = d.getElementsByTagName(s)[0],\n' +
            '                j = d.createElement(s),\n' +
            "                dl = l != 'dataLayer' ? '&l=' + l : '';\n" +
            '            j.async = true;\n' +
            "            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;\n" +
            '            f.parentNode.insertBefore(j, f);\n' +
            "        })(window, document, 'script', 'dataLayer', 'GTM-PM9RP3');\n" +
            '\n'
    );
    analytics.appendChild(inlineScript);
    document.getElementsByTagName('body')[0].appendChild(analytics);
};

const removeStaticBundle = () => {
    const bundles = ['sr1', 'sr2'];
    bundles.map((bundle: string) => {
        removeScript(bundle);
    });
};

const removeScript = (id: string) => {
    const script = document.getElementById(id);
    if (script) {
        script.remove();
    }
};
