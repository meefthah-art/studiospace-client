import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="container-x grid min-h-[70vh] place-items-center py-16">
      <div className="flex max-w-lg flex-col items-center text-center">
        <svg viewBox="0 0 320 220" className="h-56 w-auto" role="img" aria-label="An empty studio with a spotlight and a camera on a tripod">
          <polygon points="160,20 90,200 230,200" fill="#FFB020" opacity="0.22" />
          <rect x="146" y="8" width="28" height="22" rx="4" fill="#12172B" />
          <line x1="160" y1="0" x2="160" y2="8" stroke="#12172B" strokeWidth="4" />
          <ellipse cx="160" cy="200" rx="90" ry="12" fill="#2F52F5" opacity="0.25" />
          <g transform="translate(228 112)">
            <line x1="20" y1="40" x2="4" y2="86" stroke="#12172B" strokeWidth="4" strokeLinecap="round" />
            <line x1="20" y1="40" x2="36" y2="86" stroke="#12172B" strokeWidth="4" strokeLinecap="round" />
            <line x1="20" y1="40" x2="20" y2="88" stroke="#12172B" strokeWidth="4" strokeLinecap="round" />
            <rect x="0" y="12" width="40" height="28" rx="5" fill="#2F52F5" />
            <circle cx="20" cy="26" r="8" fill="#12172B" /><circle cx="20" cy="26" r="3" fill="#FFB020" />
          </g>
          <text x="70" y="150" fontFamily="sans-serif" fontSize="64" fontWeight="700" fill="#2F52F5">404</text>
        </svg>
        <h1 className="mt-4 text-3xl font-bold">This set is empty</h1>
        <p className="mt-2 leading-relaxed text-base-content/70">The page you are looking for has wrapped and left the building. Head back to the lobby and find another studio.</p>
        <Link href="/" className="btn btn-primary mt-6">Return to Home</Link>
      </div>
    </section>
  );
}
