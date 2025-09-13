const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export async function fetchCount(): Promise<number> {
  const r = await fetch(`${API}/api/count`, {cache: 'no-store'});
  const j = await r.json();
  return j.total;
}

export async function petOnce(): Promise<number> {
  const r = await fetch(`${API}/api/pet`, { method: "POST" });
  const j = await r.json();
  return j.total;
}