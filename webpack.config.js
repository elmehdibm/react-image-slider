const webpack = require('webpack');

module.exports = {
    entry: './index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
        ]
    },
    // Use externals to exclude libraries
    externals: ['react'],
    output: {
        path: __dirname + '/react-image-slider',
        publicPath: '/',
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    }
};
