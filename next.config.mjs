/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages 静态导出配置
  output: "export",
  trailingSlash: true,
  basePath: process.env.NODE_ENV === "production" ? "/yizi-space" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/yizi-space" : "",
  images: {
    unoptimized: true,
  },
  // 确保静态导出时处理动态路由
  distDir: "out",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
