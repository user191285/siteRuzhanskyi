export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  const headers = { "Content-Type": "application/json" };
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), { status: 400, headers });
  }
  const { name, phone, lang = "uk" } = body;
  if (!name?.trim() || !phone?.trim()) {
    return new Response(JSON.stringify({ ok: false, error: "Name and phone are required" }), { status: 400, headers });
  }
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
