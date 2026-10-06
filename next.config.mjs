import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  images: {
    // Local placeholder images live in /public/images for the trial.
    // PHASE 2: add remotePatterns here when photos move to a CMS/CDN (Sanity, Cloudinary, etc.).
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
