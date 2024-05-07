function __vite__mapDeps(indexes) {
    if (!__vite__mapDeps.viteFileDeps) {
        __vite__mapDeps.viteFileDeps = [
            './DocsRenderer-K4EAMTCU-KBytafOz.js',
            './iframe-D-y7xxYP.js',
            './index-CsdIBAqE.js',
            './react-18-Te5-Jngr.js',
            './index-5f0m1pej.js',
            './index-Vg9IHUb1.js',
            './index-DYADbu9O.js',
            './index-CwJzlvYf.js',
            './index-DrFu-skq.js',
        ];
    }
    return indexes.map((i) => __vite__mapDeps.viteFileDeps[i]);
}
import { _ as a } from './iframe-D-y7xxYP.js';
import '../sb-preview/runtime.js';
const { global: s } = __STORYBOOK_MODULE_GLOBAL__;
var _ = Object.entries(s.TAGS_OPTIONS ?? {}).reduce((e, r) => {
        let [t, o] = r;
        return o.excludeFromDocsStories && (e[t] = !0), e;
    }, {}),
    d = {
        docs: {
            renderer: async () => {
                let { DocsRenderer: e } = await a(
                    () => import('./DocsRenderer-K4EAMTCU-KBytafOz.js'),
                    __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8]),
                    import.meta.url,
                );
                return new e();
            },
            stories: {
                filter: (e) => {
                    var r;
                    return (
                        (e.tags || []).filter((t) => _[t]).length === 0 &&
                        !((r = e.parameters.docs) != null && r.disable)
                    );
                },
            },
        },
    };
export { d as parameters };
