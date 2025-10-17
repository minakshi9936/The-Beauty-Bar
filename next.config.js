/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // keep ignoring ESLint errors
  },
  images: {
    unoptimized: true, // keep unoptimized images for Netlify
  },
  webpack: (config) => {
    // Ignore Supabase "Critical dependency" warnings
    config.ignoreWarnings = [/Critical dependency/];
    return config;
  },
  typescript: {
    // Ignore TS errors during build (optional, not recommended long-term)
    ignoreBuildErrors: false, // keep false for production safety
  },
};

module.exports = nextConfig;
