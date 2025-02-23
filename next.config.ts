import type { NextConfig } from "next";
import { rewrites } from "./config/rewrites";
import { images } from "./config/images";

const nextConfig: NextConfig = {
  rewrites,
  images,
};

export default nextConfig;
