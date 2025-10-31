const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "cdn.example.com"
      },
      {
        protocol: "https",
        hostname: "picsum.photos"
      }
    ]
  }
};

export default nextConfig;
