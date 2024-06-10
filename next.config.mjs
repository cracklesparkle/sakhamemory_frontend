/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["ui"],
    //output: "standalone",
    sassOptions: {
        prependData: `@import "./_mantine.scss";`,
    }
};

export default nextConfig;
