"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { FaXTwitter, FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa6";
import Logo from "./Logo";
import { CATEGORIES } from "@/lib/constants";

const SOCIALS = [
  { icon: FaXTwitter, label: "X", href: "https://x.com" },
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
  { icon: FaFacebookF, label: "Facebook", href: "https://facebook.com" },
  { icon: FaYoutube, label: "YouTube", href: "https://youtube.com" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const subscribe = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Enter a valid email address to subscribe.");
    toast.success("You are subscribed. New studios will land in your inbox.");
    setEmail("");
  };
  return (
    <footer className="mt-10 bg-secondary text-secondary-content">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Our mission is to make professional creative space affordable and bookable in minutes, for everyone who makes things.
          </p>
          <div className="mt-5 flex gap-2">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-primary">
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-base font-semibold text-white">Quick links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {[["/", "Home"], ["/studios", "Explore Studios"], ["/how-it-works", "How It Works"], ["/about", "About Us"], ["/add-studio", "Host Your Space"]].map(([h, l]) => (
              <li key={h}><Link href={h} className="hover:text-white">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-base font-semibold text-white">Popular categories</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {CATEGORIES.map((c) => (
              <li key={c.value}><Link href={`/studios?category=${encodeURIComponent(c.value)}`} className="hover:text-white">{c.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-base font-semibold text-white">Studio news in your inbox</h4>
          <p className="mb-3 text-sm text-white/70">New spaces and host tips, twice a month.</p>
          <form onSubmit={subscribe} className="join w-full">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
              className="input join-item w-full min-w-0 bg-white/10 text-white placeholder:text-white/40" aria-label="Email address" />
            <button className="btn btn-accent join-item">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/60 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} StudioSpace. All rights reserved.</p>
          <p>By using StudioSpace you agree to our Terms of Use and Privacy Policy.</p>
        </div>
      </div>
    </footer>
  );
}
