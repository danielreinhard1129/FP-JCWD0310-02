/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'jcwd031002.purwadhikabootcamp.com',
      },
    ],
  },
};

module.exports = nextConfig;
