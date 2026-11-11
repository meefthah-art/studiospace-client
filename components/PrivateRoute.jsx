"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "./Providers";
import PageSpinner from "./PageSpinner";

// Waits for the session check to finish, so reloading a private page never bounces a logged-in user to /login.
export default function PrivateRoute({ children }) {
  const { user, loading } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!loading && !user) router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
  }, [loading, user, pathname, router]);
  if (loading || !user) return <PageSpinner />;
  return children;
}
