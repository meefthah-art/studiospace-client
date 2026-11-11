"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Toaster } from "sonner";
import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/api";

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

export default function Providers({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const [tokenReady, setTokenReady] = useState(false);
  const [theme, setTheme] = useState("studiolight");
  const [wishlist, setWishlist] = useState([]);
  const user = session?.user || null;
  const userId = user?.id;

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "studiolight");
  }, []);

  // Whenever a BetterAuth session exists, make sure the API's HTTPOnly JWT cookie exists too.
  // This also runs on every page reload, so a logged-in user is never bounced to /login.
  useEffect(() => {
    if (isPending) return;
    if (!userId) { setTokenReady(true); setWishlist([]); return; }
    let cancelled = false;
    setTokenReady(false);
    fetch("/api/session-token", { method: "POST" })
      .catch(() => {})
      .finally(() => !cancelled && setTokenReady(true));
    return () => { cancelled = true; };
  }, [userId, isPending]);

  useEffect(() => {
    if (!userId || !tokenReady) return;
    api("/wishlist/ids").then(setWishlist).catch(() => {});
  }, [userId, tokenReady]);

  const toggleTheme = useCallback(() => {
    const next = theme === "studiodark" ? "studiolight" : "studiodark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("studiospace-theme", next); } catch {}
    setTheme(next);
  }, [theme]);

  const logout = useCallback(async () => {
    await fetch("/api/session-token", { method: "DELETE" }).catch(() => {});
    await authClient.signOut();
    setWishlist([]);
  }, []);

  const toggleWishlist = useCallback(async (studioId) => {
    const id = String(studioId);
    const has = wishlist.includes(id);
    setWishlist((w) => (has ? w.filter((x) => x !== id) : [...w, id]));
    try {
      await api(`/wishlist/${id}`, { method: has ? "DELETE" : "POST" });
      return !has;
    } catch (e) {
      setWishlist((w) => (has ? [...w, id] : w.filter((x) => x !== id)));
      throw e;
    }
  }, [wishlist]);

  return (
    <AppContext.Provider value={{ user, loading: isPending || !tokenReady, logout, theme, toggleTheme, wishlist, toggleWishlist, tokenReady }}>
      {children}
      <Toaster richColors closeButton position="top-right" theme={theme === "studiodark" ? "dark" : "light"} />
    </AppContext.Provider>
  );
}
