"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FiEye, FiEyeOff, FiCheck, FiX } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { useApp } from "@/components/Providers";
import GoogleButton from "@/components/GoogleButton";

export default function RegisterPage() {
  const router = useRouter();
  const { user, loading } = useApp();
  const [f, setF] = useState({ name: "", email: "", photo: "", password: "" });
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  useEffect(() => { if (!loading && user && !busy) router.replace("/"); }, [loading, user]);

  const rules = [
    { ok: /[A-Z]/.test(f.password), text: "One uppercase letter" },
    { ok: /[a-z]/.test(f.password), text: "One lowercase letter" },
    { ok: f.password.length >= 6, text: "At least 6 characters" },
  ];
  const valid = rules.every((r) => r.ok);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!valid) { const m = "Password must have an uppercase letter, a lowercase letter and at least 6 characters."; setError(m); return toast.error(m); }
    setBusy(true);
    const { error: err } = await authClient.signUp.email({ name: f.name.trim(), email: f.email.trim(), password: f.password, image: f.photo.trim() || undefined });
    if (err) {
      const m = /exist/i.test(err.message || "") ? "An account with this email already exists. Try logging in." : err.message || "Registration failed. Please try again.";
      setError(m); toast.error(m); setBusy(false);
      return;
    }
    toast.success("Account created. Please log in to continue.");
    router.push("/login");
  };

  return (
    <section className="container-x grid min-h-[80vh] place-items-center py-12">
      <div className="w-full max-w-md rounded-box border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-base-content/65">Book studios or host your own.</p>
        <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
          <div><label htmlFor="name" className="mb-1 block text-sm font-medium">Name</label><input id="name" className="input-field" value={f.name} onChange={set("name")} required autoComplete="name" /></div>
          <div><label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label><input id="email" type="email" className="input-field" value={f.email} onChange={set("email")} required autoComplete="email" /></div>
          <div><label htmlFor="photo" className="mb-1 block text-sm font-medium">Photo URL</label><input id="photo" type="url" className="input-field" value={f.photo} onChange={set("photo")} placeholder="https://..." /></div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">Password</label>
            <div className="relative">
              <input id="password" type={show ? "text" : "password"} className="input-field pr-11" value={f.password} onChange={set("password")} required autoComplete="new-password" />
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60" aria-label={show ? "Hide password" : "Show password"}>{show ? <FiEyeOff /> : <FiEye />}</button>
            </div>
            {f.password && (
              <ul className="mt-2 space-y-1 text-xs">
                {rules.map((r) => <li key={r.text} className={`flex items-center gap-1.5 ${r.ok ? "text-success" : "text-error"}`}>{r.ok ? <FiCheck /> : <FiX />}{r.text}</li>)}
              </ul>
            )}
          </div>
          {error && <p role="alert" className="rounded-lg bg-error/10 p-3 text-sm text-error">{error}</p>}
          <button className="btn btn-primary btn-block" disabled={busy || !f.name || !f.email}>{busy && <span className="loading loading-spinner loading-sm" />}Register</button>
        </form>
        <div className="divider my-5 text-xs">or</div>
        <GoogleButton callbackURL="/" />
        <p className="mt-6 text-center text-sm text-base-content/70">Already have an account? <Link href="/login" className="font-semibold text-primary hover:underline">Log in</Link></p>
      </div>
    </section>
  );
}
