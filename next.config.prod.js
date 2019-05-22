module.exports = {
  assetPrefix: '/novo',
  webpack: (config) => {
    config.output.publicPath = `/novo${config.output.publicPath}`;
    return config;
  },
}
