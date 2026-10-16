/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "hossam-portfolio";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isGithubPages ? `/${repoName}` : undefined);

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: basePath || undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
