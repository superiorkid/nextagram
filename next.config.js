/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverActions: true },
  images: {
    domains: [
      "ik.imagekit.io",
      "images.unsplash.com",
      "cdn.discordapp.com",
      "plus.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
