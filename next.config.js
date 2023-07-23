const path = require('path')
const { version } = require('./package.json');

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Enable static exports for the App Router.
   *
   * @see https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
   */
  output: "export",

  /**
   * Set base path. This is usually the slug of your repository.
   *
   * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
   */
  // basePath: "/nextjs-github-pages",

  /**
   * Disable server-based image optimization. Next.js does not support
   * dynamic features with static exports.
   *
   * @see https://nextjs.org/docs/pages/api-reference/components/image#unoptimized
   */
  images: {
    unoptimized: true,
  },

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
    jsconfigPaths: true, // enables it for both jsconfig.json and tsconfig.json
  },

  publicRuntimeConfig: {
    version,
  },
  
  reactStrictMode: true,
  assetPrefix: isProd ? 'https://s09z.github.io.git' : '',
}

module.exports = nextConfig
