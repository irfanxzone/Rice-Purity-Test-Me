const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

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
    async headers() {
        return [{
            source: '/optimized/:path*',
            headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
        }];
    },
    async redirects() {
        return [
            {
                source: "/:path*",
                has: [{ type: "host", value: "www\\.ricepuritytestme\\.com" }],
                destination: "https://ricepuritytestme.com/:path*",
                permanent: true,
            },
            {
                source: '/:path*',
                has: [
                    {
                        type: 'header',
                        key: 'x-forwarded-proto',
                        value: 'http',
                    },
                ],
                destination: 'https://ricepuritytestme.com/:path*',
                permanent: true,
            },
        ];
    },
};

// Keep dev hot-reload chunks separate from production build/start output.
module.exports = (phase) => ({
    ...nextConfig,
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
});
