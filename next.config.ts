import type { NextConfig } from "next";
import path from "node:path";

// GitHub Project Pages serve under /<repo>/. Keep this in sync with the repo
// name and the /invitation prefix used on asset URLs in globals.css & page.tsx.
const BASE = "/invitation";

const nextConfig: NextConfig = {
  // Static export → hostable on GitHub Pages (no server needed).
  output: "export",
  basePath: BASE,
  images: { unoptimized: true },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
