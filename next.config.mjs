/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.redd.it",
        protocol: "https",
      },
      {
        hostname: "external-preview.redd.it",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
