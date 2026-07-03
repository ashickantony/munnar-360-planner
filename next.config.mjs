/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local placeholder images live in /public/images for the trial.
    // PHASE 2: add remotePatterns here when photos move to a CMS/CDN (Sanity, Cloudinary, etc.).
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
