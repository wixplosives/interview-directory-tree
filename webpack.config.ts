import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration } from "webpack";

const config: Configuration = {
    mode: "development",
    devtool: "source-map",
    context: __dirname,
    entry: "./src/client",
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /\.d\.ts$/,
                loader: "@ts-tools/webpack-loader",
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: { localIdentName: "[name]_[local]" },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|woff2|ttf|ico)$/i,
                loader: "url-loader",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Directory Tree",
            favicon: "./public/favicon.ico",
        }),
    ],
    stats: "errors-only",
};

export default config;
