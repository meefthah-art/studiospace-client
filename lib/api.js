// Every request goes through the Next.js proxy (/server-api) so the HTTPOnly cookie is sent automatically.
export async function api(path, { method = "GET", body } = {}) {
  const res = await fetch(`/server-api${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
    cache: "no-store",
  });
  let data = null;
  try { data = await res.json(); } catch {}
  if (!res.ok) {
    const err = new Error(data?.message || "Something went wrong. Please try again.");
    err.status = res.status;
    throw err;
  }
  return data;
}

export async function uploadToImgbb(file) {
  const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
  if (!key) throw new Error("Image upload is not configured. Paste an image URL instead.");
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body: form });
  const data = await res.json();
  if (!res.ok || !data?.data?.url) throw new Error("Image upload failed. Try a smaller file.");
  return data.data.url;
}
