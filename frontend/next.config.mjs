/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_API_URL: process.env.NEXT_API_URL,
        MAPS_DEMO_KEY: process.env.MAPS_DEMO_KEY,
      },
      images: {
        domains: ['localhost'],
      },
};

export default nextConfig;
