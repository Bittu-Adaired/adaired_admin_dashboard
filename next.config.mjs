/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    images: {
      remotePatterns: [
        {
          protocol: "http",
          hostname: "localhost",
          port: "5173",
          pathname: "**",
        },
      ],
    },
  };
  
  export default nextConfig;

