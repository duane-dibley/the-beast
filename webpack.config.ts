import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { Configuration, RuleSetRule } from 'webpack';
import nodeExternals from 'webpack-node-externals';

const cssRule: RuleSetRule = {
  loader: [
    MiniCssExtractPlugin.loader, // instead of style-loader
    'css-loader'
  ],
  test: /\.css$/
};

const tsRule: RuleSetRule = {
  exclude: /node_modules/,
  loader: 'ts-loader',
  test: /\.tsx?$/
};

const clientConfig: Configuration = {
  devtool: 'inline-source-map',
  entry: {
    'app.bundle': [
      // css for react-grid-layout
      path.resolve(__dirname, 'node_modules/react-grid-layout/css/styles.css'),
      path.resolve(__dirname, 'node_modules/react-resizable/css/styles.css'),
      //
      path.resolve(__dirname, 'src/app/index.tsx')
    ],
  },
  module: {
    rules: [cssRule, tsRule]
  },
  output: {
    // chunkFilename: '[id].[hash:8].js',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
    // sourceMapFilename: '[name].[hash:8].map',
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      // chunkFilename: '[id].css',
      filename: '[name].css'
    })
  ],
  resolve: {
    alias: {
      '@store': path.resolve(__dirname, 'src/store')
    },
    extensions: ['.css', '.js', '.ts', '.tsx']
  }
};

const serverConfig: Configuration = {
  entry: './src/server/index.tsx',
  externals: [nodeExternals()],
  module: {
    rules: [tsRule]
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      '@store': path.resolve(__dirname, 'src/store')
    },
    extensions: ['.js', '.ts', '.tsx']
  },
  target: 'node'
};

export default [
  clientConfig,
  serverConfig
];
