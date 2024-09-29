/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**.traveler.es',
          },
        ],
      }
}

module.exports = nextConfig
