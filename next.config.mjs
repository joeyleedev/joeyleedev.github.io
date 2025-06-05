/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages 静态导出配置
  output: "export",
  trailingSlash: true,
  basePath: process.env.NODE_ENV === "production" ? "/yizi-space" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/yizi-space/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
