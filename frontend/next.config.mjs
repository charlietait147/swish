/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_API_URL: process.env.NEXT_API_URL,
      },
      images: {
        domains: ['localhost'],
      },
};

export default nextConfig;
