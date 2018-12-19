const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "inline-source-map",

  entry: {
    app: ["./client/app/index.ts"]
  },

  output: {
    path: path.resolve(__dirname, "server", "public"),
    // publicPath: "/app/",
    filename: "[name].js",
    chunkFilename: "[chunkhash].js"
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        // test: /\.scss$/,
        // loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(['css-loader'])
      },
      {
        test: /\.html$/,
        use: 'vue-template-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  plugins: [
    // new HTMLWebpackPlugin({
    //   title: 'todos'
    // }),
    new ExtractTextPlugin('[name].css')
  ]

}