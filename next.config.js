/** @type {import('next').NextConfig} */
module.exports = {
  webpack(config) {
    config.externals = [...config.externals, 'hnswlib-node']; // by adding this line, solved the import
    return config;
  },
};
