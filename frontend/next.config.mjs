// Let next/image optimise images served by the API (cafe photos, avatars)
const apiUrl = process.env.NEXT_API_URL ? new URL(process.env.NEXT_API_URL) : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Strip all console.* calls from production bundles so nothing reaches a user's browser console
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    env: {
        NEXT_API_URL: process.env.NEXT_API_URL,
        MAPS_DEMO_KEY: process.env.MAPS_DEMO_KEY,
      },
      images: {
        domains: ['localhost'],
        remotePatterns: apiUrl
          ? [
              {
                protocol: apiUrl.protocol.replace(':', ''),
                hostname: apiUrl.hostname,
                port: apiUrl.port,
              },
            ]
          : [],
      },
};

export default nextConfig;
