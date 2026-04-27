/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'rice-purity-test-me-nn4o.vercel.app',
          },
        ],
        destination: 'https://www.ricepuritytestme.com/:path*',
        permanent: true,
      },
    ];
  },
  // ...rest of your existing config
};

module.exports = nextConfig;
