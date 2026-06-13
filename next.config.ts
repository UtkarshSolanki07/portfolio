import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'three',
      '@react-three/drei',
      '@react-three/fiber',
    ],
  },
};

export default nextConfig;
