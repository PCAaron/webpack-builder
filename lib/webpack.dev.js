const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');

const devConfig = {
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热更新
    ],
    devServer: {
        content: './dist',
        hot: true,
        stats: 'errors-only',
    },
    devtool: 'cheap-source-map', // 代码调试：经过loader转换过的代码（仅限行）
};

module.exports = merge(baseConfig, devConfig);
