import dotenv from 'dotenv';

// Load environment variables based on the NODE_ENV
const envFile = process.env.NODE_ENV === 'staging' ? '.env.staging' : '.env';

dotenv.config({ path: envFile });

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  reactStrictMode: false,
};



export default nextConfig;