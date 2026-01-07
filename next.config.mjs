/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
         remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
            {
        protocol: "http",
        hostname: "https://e-learning-sigma-sage.vercel.app",
      },
    ],
    },
};

export default nextConfig;