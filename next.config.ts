import type { NextConfig } from "next";
import { rewrites } from "./config/rewrites";

const nextConfig: NextConfig = {
  rewrites,
};

export default nextConfig;
