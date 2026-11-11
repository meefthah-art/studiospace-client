"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { FiMenu, FiX, FiGrid, FiPlusCircle, FiList, FiCalendar, FiHeart, FiLogOut } from "react-icons/fi";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import SafeImg from "./SafeImg";
import { useApp } from "./Providers";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
];
const MENU = [
  { href: "/dashboard", label: "Dashboard", icon: FiGrid },
  { href: "/add-studio", label: "Add New Studio", icon: FiPlusCircle },
  { href: "/my-listings", label: "My Studio Listings", icon: FiList },
  { href: "/my-bookings", label: "My Bookings", icon: FiCalendar },
  { href: "/wishlist", label: "Saved Studios", icon: FiHeart },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useApp();
  const [open, setOpen] = useState(false);
  const active = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    toast.success("You have been logged out.");
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}
              className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${active(l.href) ? "text-primary" : "text-base-content/75"}`}>
              {l.label}
              {active(l.href) && <span className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-primary" />}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {loading ? (
            <div className="skeleton h-9 w-9 rounded-full" />
          ) : user ? (
            <div className="dropdown dropdown-end dropdown-hover hidden lg:block">
              <div tabIndex={0} role="button" className="flex items-center gap-2 rounded-full p-0.5 ring-2 ring-primary/40 hover:ring-primary" aria-label="Account menu">
                {user.image ? <SafeImg src={user.image} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
                  : <span className="grid h-9 w-9 place-items-center rounded-full bg-primary font-bold text-primary-content">{user.name?.[0]?.toUpperCase()}</span>}
              </div>
              <div tabIndex={0} className="dropdown-content z-[60] mt-2 w-64 rounded-box border border-base-300 bg-base-100 p-2 shadow-xl">
                <div className="px-3 py-2">
                  <p className="truncate font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-base-content/60">{user.email}</p>
                </div>
                <div className="my-1 h-px bg-base-300" />
                {MENU.map((m) => (
                  <Link key={m.href} href={m.href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-base-200">
                    <m.icon className="h-4 w-4 text-primary" /> {m.label}
                  </Link>
                ))}
                <div className="my-1 h-px bg-base-300" />
                <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-error hover:bg-base-200">
                  <FiLogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/login" className="btn btn-ghost btn-sm">Login</Link>
              <Link href="/register" className="btn btn-primary btn-sm">Register</Link>
            </div>
          )}
          <button className="btn btn-ghost btn-circle btn-sm lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-base-300 bg-base-100 lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-medium ${active(l.href) ? "bg-primary/10 text-primary" : "hover:bg-base-200"}`}>{l.label}</Link>
            ))}
            <div className="my-2 h-px bg-base-300" />
            {user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2">
                  {user.image ? <SafeImg src={user.image} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
                    : <span className="grid h-9 w-9 place-items-center rounded-full bg-primary font-bold text-primary-content">{user.name?.[0]?.toUpperCase()}</span>}
                  <div className="min-w-0"><p className="truncate text-sm font-semibold">{user.name}</p><p className="truncate text-xs text-base-content/60">{user.email}</p></div>
                </div>
                {MENU.map((m) => (
                  <Link key={m.href} href={m.href} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-base-200">
                    <m.icon className="h-4 w-4 text-primary" /> {m.label}
                  </Link>
                ))}
                <button onClick={handleLogout} className="flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-error hover:bg-base-200"><FiLogOut className="h-4 w-4" /> Logout</button>
              </>
            ) : (
              <div className="flex gap-2 px-1">
                <Link href="/login" onClick={() => setOpen(false)} className="btn btn-outline btn-sm flex-1">Login</Link>
                <Link href="/register" onClick={() => setOpen(false)} className="btn btn-primary btn-sm flex-1">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
