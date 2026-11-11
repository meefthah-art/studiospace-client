const API = process.env.API_URL || "http://localhost:5000";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The browser only ever talks to this origin. /server-api/* is proxied to the Express API,
  // so the HTTPOnly JWT cookie travels with every request (no cross-site cookie problems).
  async rewrites() {
    return [{ source: "/server-api/:path*", destination: `${API}/api/:path*` }];
  },
};
export default nextConfig;
