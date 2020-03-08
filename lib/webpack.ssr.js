const merge = require('webpack-merge');
const cssnano = require('cssnano');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const baseConfig = require('./webpack.base');

const ssrConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /.css$/,
                use: 'ignore-loader',
            },
            {
                test: /.less$/,
                use: 'ignore-loader',
            },
        ],
    },
    plugins: [
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /.css$/g,
            cssProcessor: cssnano,
        }),
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'react',
                    entry: 'https://unpkg.com/react@16/umd/react.production.min.js',
                    global: 'React',
                },
                {
                    module: 'react-dom',
                    entry: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
                    global: 'ReactDOM',
                },
            ],
        }),
    ],
    optimization: {
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2,
                },
            },
        },
    },
};

module.exports = merge(baseConfig, ssrConfig);
