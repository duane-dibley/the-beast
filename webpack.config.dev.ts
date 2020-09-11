import autoprefixer from 'autoprefixer';
import path from 'path';
import { Configuration } from 'webpack';
import webpackNodeExternals from 'webpack-node-externals';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config: Configuration = {
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, 'src/common/'),
    },
    extensions: ['.css', '.js', '.scss', '.styl', '.ts', '.tsx'],
  },
};

const client: Configuration = {
  devtool: 'inline-source-map',
  entry: {
    client: [
      path.resolve(__dirname, 'src/client/index.tsx'),
      path.resolve(__dirname, 'node_modules/react-grid-layout/css/styles.css'),
      path.resolve(__dirname, 'node_modules/react-resizable/css/styles.css'),
    ],
  },
  module: {
    rules: [
      {
        loader: [
          MiniCssExtractPlugin.loader, // instead of style-loader
          'css-loader',
        ],
        test: /\.css$/,
      },
      {
        exclude: /node_modules/,
        loader: 'ts-loader',
        test: /\.tsx?$/,
      },
      {
        test: /\.scss$/,
        use: [
          'isomorphic-style-loader',
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: { modules: true, sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()],
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.styl$/,
        use: [
          'isomorphic-style-loader',
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: { modules: true, sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()],
            },
          },
          {
            loader: 'stylus-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  output: {
    chunkFilename: '[id].chunk.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/public'),
    sourceMapFilename: '[name].map.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      chunkFilename: '[id].css',
      filename: '[name].bundle.css',
    }),
  ],
};

const server: Configuration = {
  entry: {
    server: [path.resolve(__dirname, 'src/server/index.tsx')],
  },
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'ts-loader',
        test: /\.tsx?$/,
      },
      {
        test: /\.scss$/,
        use: [
          'isomorphic-style-loader',
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: { modules: true, sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()],
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.styl$/,
        use: [
          'isomorphic-style-loader',
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: { modules: true, sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()],
            },
          },
          {
            loader: 'stylus-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    chunkFilename: '[id].chunk.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    sourceMapFilename: '[name].map.js',
  },
  target: 'node',
};

export default [
  { ...config, ...server },
  { ...config, ...client },
];
