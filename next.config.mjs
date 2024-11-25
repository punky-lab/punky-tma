/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000', // 如果你的应用在3001端口运行
      },
    ],
  },
};


export default nextConfig;
