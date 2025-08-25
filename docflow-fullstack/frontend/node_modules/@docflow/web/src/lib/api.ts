export const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Se sua API usa sessão/cookie, habilite:
      // "Accept": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`POST ${path} -> HTTP ${res.status} ${res.statusText}\n${text}`);
  }
  // Algumas APIs retornam 201 sem body. Ajuste se necessário:
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? (await res.json()) as T : (undefined as T);
}
