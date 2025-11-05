const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }
        ]
      }
    ];
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
