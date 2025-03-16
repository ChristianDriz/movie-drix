import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.tmdb.org",
                pathname: "**",
            },
        ],
        unoptimized: true, // (Optional) Disables automatic image optimization
    },
};

export default nextConfig;
