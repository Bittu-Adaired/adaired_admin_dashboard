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
        {
          protocol: "https",
          hostname: "res.cloudinary.com",
          port: "",
          pathname: "**",
        },
      ],
    },
  };
  
  export default nextConfig;

