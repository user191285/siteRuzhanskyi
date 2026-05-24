import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_BMbYwLT7.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/contact.astro.mjs');
const _page2 = () => import('./pages/en/portfolio.astro.mjs');
const _page3 = () => import('./pages/en/privacy.astro.mjs');
const _page4 = () => import('./pages/en/solutions/_slug_.astro.mjs');
const _page5 = () => import('./pages/en.astro.mjs');
const _page6 = () => import('./pages/portfolio.astro.mjs');
const _page7 = () => import('./pages/privacy.astro.mjs');
const _page8 = () => import('./pages/solutions/_slug_.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/contact.ts", _page1],
    ["src/pages/en/portfolio.astro", _page2],
    ["src/pages/en/privacy.astro", _page3],
    ["src/pages/en/solutions/[slug].astro", _page4],
    ["src/pages/en/index.astro", _page5],
    ["src/pages/portfolio.astro", _page6],
    ["src/pages/privacy.astro", _page7],
    ["src/pages/solutions/[slug].astro", _page8],
    ["src/pages/index.astro", _page9]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "16d10dc3-99ca-45ec-846e-ffaf788e9657"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
