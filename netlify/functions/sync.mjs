import { getStore } from "@netlify/blobs";
export default async (req) => {
  const names = Object.keys(process.env).filter((k) => /sync|pass/i.test(k));
  const env = (Netlify.env.get("SYNC_PASSCODE") || process.env.SYNC_PASSCODE || "").trim();
  const url = new URL(req.url);
  const got = (req.headers.get("x-passcode") || url.searchParams.get("pass") || "").trim();
  if (!env) return new Response("No SYNC_PASSCODE visible. Variables with sync or pass in the name: " + (names.join(", ") || "none"), { status: 401 });
  if (got !== env) return new Response("Passcode mismatch. Server expects " + env.length + " characters, received " + got.length + ".", { status: 401 });
  const store = getStore("yummy-layers");
  const cur = (await store.get("records", { type: "json" })) || {};
  if (req.method === "POST") {
    const { records = [] } = await req.json();
    for (const r of records) {
      if (!r || !r.id) continue;
      const o = cur[r.id];
      if (!o || (r.updatedAt || 0) > (o.updatedAt || 0)) cur[r.id] = r;
    }
    await store.setJSON("records", cur);
  }
  return Response.json({ records: Object.values(cur) });
};
export const config = { path: "/api/sync" };
