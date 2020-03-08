const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
const path = require('path');
const HtmlWebpackPlguin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// 返回 Node.js 进程的当前工作目录
const ROOT = process.cwd();

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(ROOT, './src/*/index.js'));

    Object.keys(entryFiles).map((index) => {
        const entryFile = entryFiles[index];

        const match = entryFile.match(/src\/(.*)\/index\.js/);
        const pageName = match && match[1];

        entry[pageName] = entryFile;
        return htmlWebpackPlugins.push(
            new HtmlWebpackPlguin({
                template: path.join(ROOT, `./src/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: ['vendors', pageName],
                inject: true,
                minify: {
                    html5: true,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: true,
                    collapsableWhitespace: true,
                    preserveLineBreaks: false,
                },
            }),
        );
    });

    return {
        entry,
        htmlWebpackPlugins,
    };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    entry,
    output: {
        path: path.join(ROOT, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader',
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer({
                                    browsers: ['last 2 version', '>1%', 'ios 7'],
                                }),
                            ],
                        },
                    },
                ],
            },
            {
                test: /.(png|jpg|jpeg|svg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]_[hash:8][ext]',
                            limit: 20480,
                        },
                    },
                ],
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8][ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ // css抽取
            filename: '[name]_[contenthash:8].css',
        }),
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
    ].concat(htmlWebpackPlugins),
    stats: 'errors-only',
};
