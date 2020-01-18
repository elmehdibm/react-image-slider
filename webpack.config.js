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
            {
                test: /\.scss$/,
                loaders: [
                    require.resolve('style-loader'),
                    require.resolve('css-loader'),
                    require.resolve('sass-loader'),
                ]
            },
            {
                test: /\.svg$/,
                loader: 'file-loader',
                query: {
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(jpg|png|gif|ico)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }
        ]
      },
    output: {
        path: __dirname + '/react-image-slider',
        publicPath: '/',
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    }
};
