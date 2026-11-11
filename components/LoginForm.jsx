"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { useApp } from "./Providers";
import GoogleButton from "./GoogleButton";
import Modal from "./Modal";

export default function LoginForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const redirect = sp.get("redirect");
  const dest = redirect && redirect.startsWith("/") ? redirect : "/";
  const { user, loading } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [forgot, setForgot] = useState(false);

  useEffect(() => { if (!loading && user && !busy) router.replace(dest); }, [loading, user]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    const { error: err } = await authClient.signIn.email({ email, password });
    if (err) {
      const msg = err.status === 401 || /invalid/i.test(err.message || "") ? "Incorrect email or password." : err.message || "Login failed. Please try again.";
      setError(msg); toast.error(msg); setBusy(false);
      return;
    }
    await fetch("/api/session-token", { method: "POST" }).catch(() => {});
    toast.success("Welcome back to StudioSpace.");
    router.push(dest);
  };

  return (
    <section className="container-x grid min-h-[80vh] place-items-center py-12">
      <div className="w-full max-w-md rounded-box border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold">Log in</h1>
        <p className="mt-1 text-sm text-base-content/65">Pick up where you left off.</p>
        <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
            <input id="email" type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" placeholder="you@example.com" />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <button type="button" onClick={() => setForgot(true)} className="text-xs text-primary hover:underline">Forgot password?</button>
            </div>
            <div className="relative">
              <input id="password" type={show ? "text" : "password"} className="input-field pr-11" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60" aria-label={show ? "Hide password" : "Show password"}>{show ? <FiEyeOff /> : <FiEye />}</button>
            </div>
          </div>
          {error && <p role="alert" className="rounded-lg bg-error/10 p-3 text-sm text-error">{error}</p>}
          <button className="btn btn-primary btn-block" disabled={busy || !email || !password}>{busy && <span className="loading loading-spinner loading-sm" />}Login</button>
        </form>
        <div className="divider my-5 text-xs">or</div>
        <GoogleButton callbackURL={dest} />
        <p className="mt-6 text-center text-sm text-base-content/70">New to StudioSpace? <Link href="/register" className="font-semibold text-primary hover:underline">Create an account</Link></p>
      </div>
      <Modal open={forgot} onClose={() => setForgot(false)} title="Password reset">
        <p className="text-sm leading-relaxed text-base-content/75">Self-service password reset is not switched on for this demo. Please create a new account with a different email, or sign in with Google.</p>
        <div className="mt-5 flex justify-end"><button className="btn btn-primary" onClick={() => setForgot(false)}>Got it</button></div>
      </Modal>
    </section>
  );
}
