"use strict";
let path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDev = process.env.NODE_ENV === "development";
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin")

const isProd = !isDev;

console.log(isDev);

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

module.exports = {
  context: path.resolve(__dirname),
  // собираем всё в режиме разработки
  mode: "development",
  // указываем тот файл,который является входным.Т.е мы указываем путь к основному файлу,а webpack уже самостоятельно соединяет все модули
  entry: {
    main: ["./src/js/script.js"],
  },
  // указываем куда нужно складывать все результаты webpack'a
  output: {
    filename: "[name].[contenthash].js",
    // куда это всё складывать?Путь(дорожка) указавается в поле path
    // для того чтобы использовать данное поле воспользуемся встроенным модулем path(он прописан вверху)

    path: path.resolve(__dirname, "dist"),
  },

  resolve: {
    extensions: [".js", ".json", ".png"],
  },
  optimization: optimization(),
  devServer: {
    static: "./",
    port: 4200,
    liveReload: false
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CopyWebpackPlugin({

      patterns:[
        {
      from: path.resolve(__dirname, 'src/forSerialsOnLeft'),
      to: path.resolve(__dirname, 'dist/forSerialsOnLeft')
    }
    ] }),
    new CopyWebpackPlugin({ patterns:[
      {
    from: path.resolve(__dirname, 'src/forNewFilmonLeft'),
    to: path.resolve(__dirname, 'dist/forNewFilmonLeft')
  }
  ]}),

 new CopyWebpackPlugin({ patterns:[
    {
  from: path.resolve(__dirname, 'src/forFilmOnLeft'),
  to: path.resolve(__dirname, 'dist/forFilmOnLeft')
}
]
    
   
  
 
}),
new CopyWebpackPlugin({ patterns:[
  {
from: path.resolve(__dirname, 'src/AllContent'),
to: path.resolve(__dirname, 'dist/AllContent')
}
]
  
 


})],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          "css-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          "css-loader",
          "less-loader",
        ],
      },

      {
        test: /\.(png|jpg|svg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
