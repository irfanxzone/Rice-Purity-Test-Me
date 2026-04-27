/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        // Removes console.* calls in production (except console.error)
        removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
    },
    eslint: {
        // Don't fail build on ESLint warnings
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;
