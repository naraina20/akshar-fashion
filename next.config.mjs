/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode : false,
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          mongodb: false,
        };
      }
      return config;
    },
  };
  
  export default nextConfig;