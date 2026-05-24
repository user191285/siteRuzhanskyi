import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import 'html-escaper';
import 'clsx';
import { N as NOOP_MIDDLEWARE_HEADER, k as decodeKey } from './chunks/astro/server_I68w5sM3.mjs';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///E:/siteRuzhanskyi/","adapterName":"@astrojs/netlify","routes":[{"file":"en/portfolio/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/en/portfolio","isIndex":false,"type":"page","pattern":"^\\/en\\/portfolio\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"portfolio","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/portfolio.astro","pathname":"/en/portfolio","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"en/privacy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/en/privacy","isIndex":false,"type":"page","pattern":"^\\/en\\/privacy\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}],[{"content":"privacy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/privacy.astro","pathname":"/en/privacy","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"en/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/en","isIndex":true,"type":"page","pattern":"^\\/en\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/index.astro","pathname":"/en","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"portfolio/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/portfolio","isIndex":false,"type":"page","pattern":"^\\/portfolio\\/?$","segments":[[{"content":"portfolio","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/portfolio.astro","pathname":"/portfolio","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"privacy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacy","isIndex":false,"type":"page","pattern":"^\\/privacy\\/?$","segments":[[{"content":"privacy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy.astro","pathname":"/privacy","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contact","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contact\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contact.ts","pathname":"/api/contact","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["E:/siteRuzhanskyi/src/pages/en/index.astro",{"propagation":"none","containsHead":true}],["E:/siteRuzhanskyi/src/pages/en/portfolio.astro",{"propagation":"none","containsHead":true}],["E:/siteRuzhanskyi/src/pages/en/privacy.astro",{"propagation":"none","containsHead":true}],["E:/siteRuzhanskyi/src/pages/en/solutions/[slug].astro",{"propagation":"none","containsHead":true}],["E:/siteRuzhanskyi/src/pages/index.astro",{"propagation":"none","containsHead":true}],["E:/siteRuzhanskyi/src/pages/portfolio.astro",{"propagation":"none","containsHead":true}],["E:/siteRuzhanskyi/src/pages/privacy.astro",{"propagation":"none","containsHead":true}],["E:/siteRuzhanskyi/src/pages/solutions/[slug].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/contact@_@ts":"pages/api/contact.astro.mjs","\u0000@astro-page:src/pages/en/portfolio@_@astro":"pages/en/portfolio.astro.mjs","\u0000@astro-page:src/pages/en/privacy@_@astro":"pages/en/privacy.astro.mjs","\u0000@astro-page:src/pages/en/solutions/[slug]@_@astro":"pages/en/solutions/_slug_.astro.mjs","\u0000@astro-page:src/pages/en/index@_@astro":"pages/en.astro.mjs","\u0000@astro-page:src/pages/portfolio@_@astro":"pages/portfolio.astro.mjs","\u0000@astro-page:src/pages/privacy@_@astro":"pages/privacy.astro.mjs","\u0000@astro-page:src/pages/solutions/[slug]@_@astro":"pages/solutions/_slug_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BMbYwLT7.mjs","E:/siteRuzhanskyi/src/components/ContactForm.tsx":"_astro/ContactForm.DAWUaAZC.js","E:/siteRuzhanskyi/src/components/LanguageSwitcher.tsx":"_astro/LanguageSwitcher.2Ug3iLY9.js","E:/siteRuzhanskyi/src/components/MobileMenu.tsx":"_astro/MobileMenu.DxOWzizF.js","@astrojs/react/client.js":"_astro/client.DrE9CFQR.js","/astro/hoisted.js?q=0":"_astro/hoisted.BScVxmeO.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/roboto-cyrillic-ext-300-normal.DIxttMbC.woff2","/_astro/roboto-cyrillic-300-normal.DzUz0kzv.woff2","/_astro/roboto-math-300-normal.5dF_7mZP.woff2","/_astro/roboto-greek-300-normal.DJEM9B4Z.woff2","/_astro/roboto-symbols-300-normal.DDU7avhj.woff2","/_astro/roboto-vietnamese-300-normal.BPvXm_f1.woff2","/_astro/roboto-latin-ext-300-normal.B90pq-BC.woff2","/_astro/roboto-latin-300-normal.CCzlftfr.woff2","/_astro/roboto-cyrillic-ext-100-normal.uxSc4Dbo.woff2","/_astro/roboto-cyrillic-100-normal.D_oR061d.woff2","/_astro/roboto-greek-100-normal.DgpMWfbq.woff2","/_astro/roboto-math-100-normal.3u4f34A3.woff2","/_astro/roboto-symbols-100-normal.CjKjWFkd.woff2","/_astro/roboto-vietnamese-100-normal.KgOkQYnu.woff2","/_astro/roboto-latin-ext-100-normal.Bue4UH9m.woff2","/_astro/roboto-latin-100-normal.vTzS_GaG.woff2","/_astro/roboto-cyrillic-ext-400-normal.qHufge6k.woff2","/_astro/roboto-cyrillic-400-normal.CBPI_iaY.woff2","/_astro/roboto-greek-400-normal.ai2Z1K3C.woff2","/_astro/roboto-symbols-400-normal.CB1Ce4Gk.woff2","/_astro/roboto-math-400-normal.BEFej5gc.woff2","/_astro/roboto-vietnamese-400-normal.D2PTxGxD.woff2","/_astro/roboto-latin-ext-400-normal.C3tdtHj3.woff2","/_astro/roboto-latin-400-normal.BqEyEoaF.woff2","/_astro/roboto-cyrillic-500-normal.CLao9AfR.woff2","/_astro/roboto-cyrillic-ext-500-normal.BWC_xYeb.woff2","/_astro/roboto-greek-500-normal.C9AnhcmC.woff2","/_astro/roboto-math-500-normal.C4NU9gLX.woff2","/_astro/roboto-symbols-500-normal.B_CZKVJS.woff2","/_astro/roboto-vietnamese-500-normal.B3ncpOoB.woff2","/_astro/roboto-latin-ext-500-normal.pMCM9Ixg.woff2","/_astro/roboto-latin-500-normal.7RbcRiD8.woff2","/_astro/roboto-cyrillic-ext-700-normal.DmFxo5wj.woff2","/_astro/roboto-cyrillic-700-normal.C2o7G-SM.woff2","/_astro/roboto-greek-700-normal.0aHWxGLu.woff2","/_astro/roboto-math-700-normal.B8YqGHVc.woff2","/_astro/roboto-symbols-700-normal.BiFDindJ.woff2","/_astro/roboto-vietnamese-700-normal.BEVeWqJt.woff2","/_astro/roboto-latin-ext-700-normal.DSBUz0N1.woff2","/_astro/roboto-latin-700-normal.BZpUvMxY.woff2","/_astro/roboto-cyrillic-ext-900-normal.IZ2B0aiV.woff2","/_astro/roboto-cyrillic-900-normal.BVOxCBIE.woff2","/_astro/roboto-math-900-normal.DQ66ivDi.woff2","/_astro/roboto-greek-900-normal.B5AAzeOC.woff2","/_astro/roboto-symbols-900-normal.1vlkxR2C.woff2","/_astro/roboto-vietnamese-900-normal.D-H2ldSl.woff2","/_astro/roboto-latin-ext-900-normal.Bg1HnWxG.woff2","/_astro/roboto-latin-900-normal.lk0O8k6m.woff2","/_astro/roboto-cyrillic-ext-300-normal.D7ank4TF.woff","/_astro/roboto-cyrillic-300-normal.DEFNdjk5.woff","/_astro/roboto-greek-300-normal.C_Dgaih9.woff","/_astro/roboto-math-300-normal.Ds0YpBw2.woff","/_astro/roboto-symbols-300-normal.BCnjhQd_.woff","/_astro/roboto-latin-ext-300-normal.CTCCHkZF.woff","/_astro/roboto-latin-300-normal.BARJ-h6h.woff","/_astro/roboto-cyrillic-ext-100-normal.mbO7vZh1.woff","/_astro/roboto-vietnamese-300-normal.INUupD3o.woff","/_astro/roboto-cyrillic-100-normal.w5umKD67.woff","/_astro/roboto-greek-100-normal.ZuTz319d.woff","/_astro/roboto-math-100-normal.DzbsQ8e_.woff","/_astro/roboto-symbols-100-normal.CqmTeVyX.woff","/_astro/roboto-latin-ext-100-normal.CRE1JcN2.woff","/_astro/roboto-vietnamese-100-normal.Cc5a3-TP.woff","/_astro/roboto-latin-100-normal.CGMktwvD.woff","/_astro/roboto-cyrillic-ext-400-normal.CaK1767H.woff","/_astro/roboto-cyrillic-400-normal.Bjg-1-sg.woff","/_astro/roboto-greek-400-normal.Bb5mj_fZ.woff","/_astro/roboto-symbols-400-normal.DLYbZahX.woff","/_astro/roboto-math-400-normal.C9RxBKAh.woff","/_astro/roboto-vietnamese-400-normal.DnpnVwnf.woff","/_astro/roboto-latin-ext-400-normal.scX0fKtV.woff","/_astro/roboto-latin-400-normal.DyYNIH4P.woff","/_astro/roboto-cyrillic-500-normal.CBKMylY4.woff","/_astro/roboto-cyrillic-ext-500-normal.DqF2hftb.woff","/_astro/roboto-greek-500-normal.oCqhoyfc.woff","/_astro/roboto-math-500-normal.C-7mKPO3.woff","/_astro/roboto-symbols-500-normal.F7c8nfcH.woff","/_astro/roboto-vietnamese-500-normal.D380IkQ8.woff","/_astro/roboto-latin-ext-500-normal.Cyc0AKLz.woff","/_astro/roboto-latin-500-normal.DQZyH_nt.woff","/_astro/roboto-cyrillic-ext-700-normal.CI7FH63F.woff","/_astro/roboto-cyrillic-700-normal.DhZFXDSN.woff","/_astro/roboto-greek-700-normal.DjRqqLBV.woff","/_astro/roboto-math-700-normal.DVoD5t2k.woff","/_astro/roboto-symbols-700-normal.BoS6HWkc.woff","/_astro/roboto-vietnamese-700-normal.DsFyXAL4.woff","/_astro/roboto-latin-ext-700-normal.BUhwtWwy.woff","/_astro/roboto-latin-700-normal.DLgJJpmK.woff","/_astro/roboto-cyrillic-ext-900-normal.Dy18Zgm9.woff","/_astro/roboto-cyrillic-900-normal.B-XH5ueX.woff","/_astro/roboto-math-900-normal.Dmeiz_CW.woff","/_astro/roboto-greek-900-normal.DWdVoZCP.woff","/_astro/roboto-symbols-900-normal.9XmQV1ku.woff","/_astro/roboto-vietnamese-900-normal.C48YQOjq.woff","/_astro/roboto-latin-ext-900-normal.CUx1IrMY.woff","/_astro/roboto-latin-900-normal.F72S18P8.woff","/_astro/index.D8wGvrXy.css","/_astro/index.lTwjuH4I.css","/favicon.svg","/images/ajax-poster.png","/images/hero-visual.jpg","/images/logo.png","/_astro/client.DrE9CFQR.js","/_astro/ContactForm.DAWUaAZC.js","/_astro/hoisted.BScVxmeO.js","/_astro/index.CVf8TyFT.js","/_astro/jsx-runtime.TBa3i5EZ.js","/_astro/LanguageSwitcher.2Ug3iLY9.js","/_astro/MobileMenu.DxOWzizF.js","/images/portfolio/agro-yukhymivka.jpg","/images/portfolio/aurora.jpg","/images/portfolio/azk-shenderivka.jpg","/images/portfolio/medical-busha.jpg","/images/portfolio/premier-tower.jpg","/images/portfolio/school-yampil.jpg","/images/portfolio/the-mall.jpg","/en/portfolio/index.html","/en/privacy/index.html","/en/index.html","/portfolio/index.html","/privacy/index.html","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"WLnYkk+sG1GG1tA8+jmcVd4hVuuX+kqZHh53IvZcYdc=","experimentalEnvGetSecretEnabled":false});

export { manifest };
