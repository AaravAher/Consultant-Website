import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Consultant-Website',
  assetPrefix: '/Consultant-Website/',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;

