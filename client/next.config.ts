import type { NextConfig } from 'next';
// require('dotenv').config();
import 'dotenv/config';

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BASE_URL: process.env.BASE_URL,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    BASE_URL_GOOGLE_CLIENT_ID: process.env.BASE_URL_GOOGLE_CLIENT_ID,
  },
};

export default nextConfig;

// module.exports = {
//   env: {
//     BASE_URL: process.env.BASE_URL,
//     NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//     BASE_URL_GOOGLE_CLIENT_ID: process.env.BASE_URL_GOOGLE_CLIENT_ID,
//   },
// };
