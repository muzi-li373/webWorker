// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    static: "./dist",
    open: true, // 自动打开浏览器
    hot: true, // 启用热更新
    liveReload: true, // 启用自动刷新
    watchFiles: ["src/**/*"], // 监听 src 目录下的所有文件变化
  },
};
