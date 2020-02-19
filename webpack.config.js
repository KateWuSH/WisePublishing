const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/bundle-[id].min.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/pug/index.pug'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/main-[id].min.css'
        }),
        new MinifyPlugin()
    ],
    module: {
        rules: [{
                test: /\.pug$/,
                use: [{
                    loader: 'pug-loader',
                    options: { pretty: true }
                }]
            },
            {
                test: /\.sass$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: "file-loader",
                options: {
                    outputPath: "assets"
                }
            }
        ]
    }
};