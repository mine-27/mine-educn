const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
    ...defaultConfig,
    entry: {
        index: path.resolve(__dirname, 'src/index.js'),
        'icon-extension/index': path.resolve(__dirname, 'src/icon-extension/index.js'),
        'inline-icon/index': path.resolve(__dirname, 'src/inline-icon/index.js'),
    },
};
