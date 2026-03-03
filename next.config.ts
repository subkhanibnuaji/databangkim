import type { NextConfig } from "next";

const isGitHubPages = process.env.DEPLOY_TARGET === "github-pages";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export",
        basePath: "/databangkim",
      }
    : {}),
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
