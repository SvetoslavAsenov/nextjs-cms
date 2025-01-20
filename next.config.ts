import type { NextConfig } from "next";
import { rewrites } from "./config/rewrites";
// import { pages } from "./config/pages";

const nextConfig: NextConfig = {
  rewrites,
  // pages,
};

export default nextConfig;
