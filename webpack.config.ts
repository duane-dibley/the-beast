import { Configuration } from 'webpack';

const config: Configuration = {
  // devtool: 'inline-source-map',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'ts-loader',
        test: /\.tsx?$/
      }
    ]
  },
  resolve: {
    extensions: ['.ts']
  }
};

export default config;
