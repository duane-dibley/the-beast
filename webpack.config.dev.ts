import path from 'path';
import { Configuration } from 'webpack';
import webpackNodeExternals from 'webpack-node-externals';

const config: Configuration = {
  module: {
    rules: [
      {
        use: [
          // 'isomorphic-style-loader',
          'style-loader',
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: { modules: true }
          }
          // 'postcss-loader'
        ],
        test: /\.css$/
      },
      {
        exclude: /node_modules/,
        loader: 'ts-loader',
        test: /\.tsx?$/
      },
      {
        test: /\.scss$/,
        use: [
          'isomorphic-style-loader',
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: { modules: true }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'isomorphic-style-loader',
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: { modules: true }
          },
          'postcss-loader',
          'stylus-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@store': path.resolve(__dirname, 'src/store')
    },
    extensions: ['.css', '.js', '.scss', '.styl', '.ts', '.tsx']
  },
};

const client: Configuration = {
  devtool: 'inline-source-map',
  entry: {
    client: path.resolve(__dirname, 'src/client/index.tsx')
  },
  output: {
    chunkFilename: '[id].js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/public'),
    sourceMapFilename: '[name].map',
  }
};

const server: Configuration = {
  entry: {
    server: path.resolve(__dirname, 'src/server/index.tsx')
  },
  externals: [webpackNodeExternals()],
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    chunkFilename: '[id].js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    sourceMapFilename: '[name].map',
  },
  target: 'node'
};

export default [
  { ...config, ...client },
  // { ...config, ...server }
];
