import { getStore } from "@netlify/blobs";
export default async (req) => {
  const pass = Netlify.env.get("SYNC_PASSCODE");
  if (!pass || req.headers.get("x-passcode") !== pass) return new Response("Unauthorized", { status: 401 });
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
