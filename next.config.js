/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  experimental: {
      outputStandalone: true,
  }
}
module.exports = {
  output: 'standalone',
  transpilePackages: ['next-international', 'international-types'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "/shared/styles/_variables.scss";`
  },
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/i,
        type: "asset",
        resourceQuery: /url/, // *.svg?url
      },
      { test: /\.ttf$/i, type: "asset/resource" },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: "prefixIds",
                    active: false,
                  },
                ],
              },
            },
          },
        ],
      },
    );
    return config;
  }
}

