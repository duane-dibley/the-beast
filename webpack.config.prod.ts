import autoprefixer from 'autoprefixer';
import path from 'path';
import { Configuration } from 'webpack';
import webpackNodeExternals from 'webpack-node-externals';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config: Configuration = {
  resolve: {
    alias: {
      '@actions': path.resolve(__dirname, 'src/common/actions'),
      '@components': path.resolve(__dirname, 'src/common/components'),
      '@hoc': path.resolve(__dirname, 'src/common/hoc'),
      '@routes': path.resolve(__dirname, 'src/common/routes'),
      '@sagas': path.resolve(__dirname, 'src/common/sagas'),
      '@store': path.resolve(__dirname, 'src/common/store'),
      '@styles': path.resolve(__dirname, 'src/common/styles')
    },
    extensions: ['.css', '.js', '.scss', '.styl', '.ts', '.tsx']
  }
};

const client: Configuration = {
  devtool: 'inline-source-map',
  entry: {
    client: [
      path.resolve(__dirname, 'src/client/index.tsx'),
      path.resolve(__dirname, 'node_modules/react-grid-layout/css/styles.css'),
      path.resolve(__dirname, 'node_modules/react-resizable/css/styles.css')
    ]
  },
  module: {
    rules: [
      {
        loader: [
          MiniCssExtractPlugin.loader, // instead of style-loader
          'css-loader'
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
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist/public'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css'
    })
  ]
};

const server: Configuration = {
  entry: {
    server: [
      path.resolve(__dirname, 'src/server/index.tsx'),
    ]
  },
  externals: [webpackNodeExternals()],
  module: {
    rules: [
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
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node'
};

export default [
  { ...config, ...server },
  { ...config, ...client }
];
