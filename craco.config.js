// eslint-disable-next-line
const { whenDev } = require('@craco/craco');
// eslint-disable-next-line
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// based on https://github.com/facebook/react/issues/16604#issuecomment-567149070

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      if (process.env.NODE_ENV === 'development') {
        webpackConfig.module.rules.push({
          test: /BabelDetectComponent\.js/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                plugins: [...whenDev(() => [require.resolve('react-refresh/babel')], [])],
              },
            },
          ],
        });
        webpackConfig.module.rules.push({
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                presets: ['@babel/react', '@babel/typescript', ['@babel/env', { modules: false }]],
                plugins: [
                  '@babel/plugin-proposal-class-properties',
                  '@babel/plugin-proposal-optional-chaining',
                  '@babel/plugin-proposal-nullish-coalescing-operator',
                  'react-refresh/babel',
                ],
              },
            },
          ],
        });
      }
      return webpackConfig;
    },
    plugins: [...whenDev(() => [new ReactRefreshPlugin()], [])],
  },
};
