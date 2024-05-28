/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    sassOptions: {
        prependData: `@import "./_mantine.scss";`,
    }
};

export default nextConfig;
