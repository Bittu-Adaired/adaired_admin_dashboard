/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    redirects: () => {
      return [
        {
          source: "/",
          destination: "/auth/login",
          permanent: true,
        },
      ];
    },
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

