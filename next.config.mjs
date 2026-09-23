/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // SVG placeholders are served as-is (see components/Media.js). Real .webp/.jpg go through the optimizer.
  },
};
export default nextConfig;
