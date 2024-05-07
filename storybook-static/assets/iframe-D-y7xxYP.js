function __vite__mapDeps(indexes) {
    if (!__vite__mapDeps.viteFileDeps) {
        __vite__mapDeps.viteFileDeps = [
            './AvtaleStatuserArbeidsgiver-BjPfUuOT.js',
            './Gjennomføres-DDe6u6XI.js',
            './index-CsdIBAqE.js',
            './Gjennomføres-CmhDSf3E.css',
            './index-DLsXyOuj.js',
            './index-Vg9IHUb1.js',
            './index-5f0m1pej.js',
            './index-DYADbu9O.js',
            './index-CwJzlvYf.js',
            './index-DrFu-skq.js',
            './AvtaleStatuserArbeidsgiver.stories-B0n9AdMc.js',
            './KlarForOppstart-D5TZALq-.js',
            './AvtaleStatuserDeltaker-Bm1IgROb.js',
            './AvtaleStatuserDeltaker.stories-DS6P9WAr.js',
            './AvtaleStatuserMentor-hrmPMSv7.js',
            './AvtaleStatuserMentor.stories-B70D3xFe.js',
            './AvtaleStatuserVeileder-DtJmEaqL.js',
            './AvtaleStatuserVeileder.stories-CuSo2C0O.js',
            './AvtaleStatuserVeileder-DS0mn8G7.css',
            './entry-preview-D_EtyHKR.js',
            './react-18-Te5-Jngr.js',
            './entry-preview-docs-U_j_-vAR.js',
            './preview-6uLYm2Ic.js',
            './preview-CwqMn10d.js',
            './preview-BAz7FMXc.js',
            './preview-Bljmgb5f.js',
            './preview-0gbt4o9e.css',
        ];
    }
    return indexes.map((i) => __vite__mapDeps.viteFileDeps[i]);
}
import '../sb-preview/runtime.js';
(function () {
    const n = document.createElement('link').relList;
    if (n && n.supports && n.supports('modulepreload')) return;
    for (const t of document.querySelectorAll('link[rel="modulepreload"]')) a(t);
    new MutationObserver((t) => {
        for (const r of t)
            if (r.type === 'childList')
                for (const o of r.addedNodes) o.tagName === 'LINK' && o.rel === 'modulepreload' && a(o);
    }).observe(document, { childList: !0, subtree: !0 });
    function l(t) {
        const r = {};
        return (
            t.integrity && (r.integrity = t.integrity),
            t.referrerPolicy && (r.referrerPolicy = t.referrerPolicy),
            t.crossOrigin === 'use-credentials'
                ? (r.credentials = 'include')
                : t.crossOrigin === 'anonymous'
                  ? (r.credentials = 'omit')
                  : (r.credentials = 'same-origin'),
            r
        );
    }
    function a(t) {
        if (t.ep) return;
        t.ep = !0;
        const r = l(t);
        fetch(t.href, r);
    }
})();
const f = 'modulepreload',
    R = function (s, n) {
        return new URL(s, n).href;
    },
    O = {},
    e = function (n, l, a) {
        let t = Promise.resolve();
        if (l && l.length > 0) {
            const r = document.getElementsByTagName('link'),
                o = document.querySelector('meta[property=csp-nonce]'),
                E = (o == null ? void 0 : o.nonce) || (o == null ? void 0 : o.getAttribute('nonce'));
            t = Promise.all(
                l.map((i) => {
                    if (((i = R(i, a)), i in O)) return;
                    O[i] = !0;
                    const u = i.endsWith('.css'),
                        p = u ? '[rel="stylesheet"]' : '';
                    if (!!a)
                        for (let c = r.length - 1; c >= 0; c--) {
                            const m = r[c];
                            if (m.href === i && (!u || m.rel === 'stylesheet')) return;
                        }
                    else if (document.querySelector(`link[href="${i}"]${p}`)) return;
                    const _ = document.createElement('link');
                    if (
                        ((_.rel = u ? 'stylesheet' : f),
                        u || ((_.as = 'script'), (_.crossOrigin = '')),
                        (_.href = i),
                        E && _.setAttribute('nonce', E),
                        document.head.appendChild(_),
                        u)
                    )
                        return new Promise((c, m) => {
                            _.addEventListener('load', c),
                                _.addEventListener('error', () => m(new Error(`Unable to preload CSS for ${i}`)));
                        });
                }),
            );
        }
        return t
            .then(() => n())
            .catch((r) => {
                const o = new Event('vite:preloadError', { cancelable: !0 });
                if (((o.payload = r), window.dispatchEvent(o), !o.defaultPrevented)) throw r;
            });
    },
    { createBrowserChannel: v } = __STORYBOOK_MODULE_CHANNELS__,
    { addons: A } = __STORYBOOK_MODULE_PREVIEW_API__,
    d = v({ page: 'preview' });
A.setChannel(d);
window.__STORYBOOK_ADDONS_CHANNEL__ = d;
window.CONFIG_TYPE === 'DEVELOPMENT' && (window.__STORYBOOK_SERVER_CHANNEL__ = d);
const P = {
    './src/stories/AvtaleStatuserArbeidsgiver.mdx': async () =>
        e(
            () => import('./AvtaleStatuserArbeidsgiver-BjPfUuOT.js'),
            __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
            import.meta.url,
        ),
    './src/stories/AvtaleStatuserArbeidsgiver.stories.tsx': async () =>
        e(
            () => import('./AvtaleStatuserArbeidsgiver.stories-B0n9AdMc.js'),
            __vite__mapDeps([10, 1, 2, 3, 11]),
            import.meta.url,
        ),
    './src/stories/AvtaleStatuserDeltaker.mdx': async () =>
        e(
            () => import('./AvtaleStatuserDeltaker-Bm1IgROb.js'),
            __vite__mapDeps([12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 11]),
            import.meta.url,
        ),
    './src/stories/AvtaleStatuserDeltaker.stories.tsx': async () =>
        e(
            () => import('./AvtaleStatuserDeltaker.stories-DS6P9WAr.js'),
            __vite__mapDeps([13, 1, 2, 3, 11]),
            import.meta.url,
        ),
    './src/stories/AvtaleStatuserMentor.mdx': async () =>
        e(
            () => import('./AvtaleStatuserMentor-hrmPMSv7.js'),
            __vite__mapDeps([14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 11]),
            import.meta.url,
        ),
    './src/stories/AvtaleStatuserMentor.stories.tsx': async () =>
        e(
            () => import('./AvtaleStatuserMentor.stories-B70D3xFe.js'),
            __vite__mapDeps([15, 1, 2, 3, 11]),
            import.meta.url,
        ),
    './src/stories/AvtaleStatuserVeileder.mdx': async () =>
        e(
            () => import('./AvtaleStatuserVeileder-DtJmEaqL.js'),
            __vite__mapDeps([16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 17, 18]),
            import.meta.url,
        ),
    './src/stories/AvtaleStatuserVeileder.stories.tsx': async () =>
        e(
            () => import('./AvtaleStatuserVeileder.stories-CuSo2C0O.js'),
            __vite__mapDeps([17, 1, 2, 3, 18]),
            import.meta.url,
        ),
};
async function T(s) {
    return P[s]();
}
const { composeConfigs: L, PreviewWeb: S, ClientApi: V } = __STORYBOOK_MODULE_PREVIEW_API__,
    w = async () => {
        const s = await Promise.all([
            e(() => import('./entry-preview-D_EtyHKR.js'), __vite__mapDeps([19, 2, 20, 6]), import.meta.url),
            e(() => import('./entry-preview-docs-U_j_-vAR.js'), __vite__mapDeps([21, 8, 2, 9]), import.meta.url),
            e(() => import('./preview-6uLYm2Ic.js'), __vite__mapDeps([22, 7]), import.meta.url),
            e(() => import('./preview-NOGN1UO6.js'), [], import.meta.url),
            e(() => import('./preview-DbT1mggi.js'), [], import.meta.url),
            e(() => import('./preview-CwqMn10d.js'), __vite__mapDeps([23, 9]), import.meta.url),
            e(() => import('./preview-B4GcaC1c.js'), [], import.meta.url),
            e(() => import('./preview-Db4Idchh.js'), [], import.meta.url),
            e(() => import('./preview-BAz7FMXc.js'), __vite__mapDeps([24, 9]), import.meta.url),
            e(() => import('./preview-Cv3rAi2i.js'), [], import.meta.url),
            e(() => import('./preview-D2d-74FL.js'), [], import.meta.url),
            e(() => import('./preview-Bljmgb5f.js'), __vite__mapDeps([25, 26]), import.meta.url),
        ]);
        return L(s);
    };
window.__STORYBOOK_PREVIEW__ = window.__STORYBOOK_PREVIEW__ || new S(T, w);
window.__STORYBOOK_STORY_STORE__ = window.__STORYBOOK_STORY_STORE__ || window.__STORYBOOK_PREVIEW__.storyStore;
export { e as _ };
