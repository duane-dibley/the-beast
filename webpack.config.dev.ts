import autoprefixer from 'autoprefixer';
import path from 'path';
import { Configuration } from 'webpack';
import webpackNodeExternals from 'webpack-node-externals';

const config: Configuration = {
  module: {
    rules: [
      {
        use: [
          'isomorphic-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()]
            }
          }
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
            options: { modules: true, sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()]
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'isomorphic-style-loader',
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: { modules: true, sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()]
            }
          },
          {
            loader: 'stylus-loader',
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/common/components'),
      '@hoc': path.resolve(__dirname, 'src/common/hoc'),
      '@routes': path.resolve(__dirname, 'src/common/routes'),
      '@store': path.resolve(__dirname, 'src/common/store'),
      '@styles': path.resolve(__dirname, 'src/common/styles')
    },
    extensions: ['.css', '.js', '.scss', '.styl', '.ts', '.tsx']
  }
};

const client: Configuration = {
  devtool: 'inline-source-map',
  entry: {
    client: path.resolve(__dirname, 'src/client/index.tsx')
  },
  output: {
    chunkFilename: '[id].chunk.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/public'),
    sourceMapFilename: '[name].map.js',
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
    chunkFilename: '[id].chunk.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    sourceMapFilename: '[name].map.js',
  },
  target: 'node'
};

export default [
  { ...config, ...server },
  { ...config, ...client }
];
