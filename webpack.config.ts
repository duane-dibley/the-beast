import path from 'path';
import { Configuration, RuleSetRule } from 'webpack';
import nodeExternals from 'webpack-node-externals';

const tsRule: RuleSetRule = {
  exclude: /node_modules/,
  loader: 'ts-loader',
  test: /\.tsx?$/
};

const common: Configuration = {
  module: {
    rules: [tsRule]
  },
  resolve: {
    alias: {
      '@store': path.resolve(__dirname, 'src/store')
    },
    extensions: ['.js', '.ts', '.tsx']
  }
};

const clientConfig: Configuration = {
  devtool: 'inline-source-map',
  entry: './src/app/index.tsx',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};

const serverConfig: Configuration = {
  entry: './src/server/index.tsx',
  externals: [nodeExternals()],
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'node'
};

export default [
  { ...common, ...clientConfig },
  { ...common, ...serverConfig }
];
