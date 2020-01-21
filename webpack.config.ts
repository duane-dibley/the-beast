import path from 'path';
import { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';

const tsRule = {
  exclude: /node_modules/,
  loader: 'ts-loader',
  test: /\.tsx?$/
};

const clientConfig: Configuration = {
  // devtool: 'inline-source-map',
  module: {
    rules: [tsRule]
  },
  resolve: {
    extensions: ['.js', '.tsx']
  }
};

const serverConfig: Configuration = {
  entry: './server/index.tsx',
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
    extensions: ['.js', '.tsx']
  },
  target: 'node'
};

export default [clientConfig, serverConfig];
