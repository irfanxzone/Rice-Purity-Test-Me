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
    async redirects() {
        return [
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

module.exports = nextConfig;
