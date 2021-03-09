const path = require('path');
module.exports = {
  webpack: (config, options, webpack) => {
    // Perform customizations to config
    // Important: return the modified config

    // changes the name of the entry point from index -> main.js
    config.entry.main = ['./api/index.js'];
    config.output.path = path.join(process.cwd(), `build-api`);

    return config;
  },
};
