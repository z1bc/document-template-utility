const HtmlWebPackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
require("webpack");

module.exports = {
    entry: './index.tsx',

    node: { global: true },

    output: {
        filename: "[name].[hash].js",
        path: __dirname + '/dist',
        publicPath: '/'
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    devServer: {
        port: 3000,
        historyApiFallback: true
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },

    optimization: {
        splitChunks: {
            chunks: 'all'
        },
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            filename: "./index.html",
            template: './index.html',
            meta: {
                viewport: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, shrink-to-fit=no',
            }
        }),
    ]
};
