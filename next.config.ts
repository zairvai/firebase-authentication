import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    appIsrStatus: true, // defaults to true
    buildActivity: true, // defaults to true
    buildActivityPosition: 'bottom-right'
  },
  async rewrites(){
    return[
        {
            source:"/__/auth/:path*",
            destination:"https://tutorial-921ca.firebaseapp.com/__/auth/:path*",
        }
    ]
  },
  async redirects(){
    return [
        {
            source:"/",
            destination:"/auth/login",
            permanent:true
        },
        {
            source:"/auth",
            destination:"/auth/login",
            permanent:true
        }
    ]
  }
};

export default nextConfig;
