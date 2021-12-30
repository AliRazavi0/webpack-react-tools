const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: {
    app: {
      import: path.resolve(__dirname, "src/index.js"),
      dependOn: "vendor",
    },
    vendor: ["react", "react-dom"],
  },
  output: {
    path: path.resolve(__dirname, "public/dist"),
    filename: "[name]-bundel-[hash].js",
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: "/node_modules/",
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults",
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        ],
        // use: {
        //   loader: "babel-loader",
        //   options: {
        //     presets: [
        //       "@babel/preset-env",
        //       "@babel/preset-react",
        //       "babel-preset-stage-0",
        //     ],
        //   },
        // },
      },
      {
        test: /\.css$/i,
        use: [
          `${devMode ? "style-loader" : MiniCssExtractPlugin.loader}`,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        type: "asset",
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        type: "asset",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]-[hash]-.css",
    }),
    new HtmlWebPackPlugin({
      title: "Web App Application",
      filename: path.resolve(__dirname, "public/dist/index.html"),
      template: path.resolve(__dirname, "src/index.html"),
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"),
    },
    compress: true,
    port: 9000,
  },
};
