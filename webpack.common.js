


const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry : "./source/index.js",
    output : {
        filename : "bundle.js",
        path : path.resolve(__dirname, "dist"),
    },
    plugins : [
        new HtmlWebpackPlugin({
            template : "./source/index.html",
            title : "ToDoList",
            inject : "body"
        })
    ],
    module : {
        rules : [
            {
                test : /\.css$/i,
                use : ["style-loader", "css-loader"],
            },
            {
                test : /\.(png|svg|jpeg|jpg|gif)$/i,
                type : "asset/resource"
            },
            {
                test : /\.(woff|tff)$/i,
                type : "asset/resource"
            }
        ]
    }
}