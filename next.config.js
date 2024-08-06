/** @type {import('next').NextConfig} */
const nextConfig = {

    experimental: {
        serverActions: {
          allowedForwardedHosts: ['fantastic-xylophone-g69wpgp5gwxfvw67-3000.app.github.dev/'],
          allowedOrigins: ["localhost:3000", "fantastic-xylophone-g69wpgp5gwxfvw67-3000.app.github.dev/"]
          
        },
      },
    reactStrictMode: false,
};

module.exports = nextConfig;


