//** Merge two different webpack configs*/
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
//**key:marketing is used when we want import subproject in container */
                  //**'marketing@' matchup with name property in marketing subProject  */
      marketing: 'marketing@http://localhost:8082/remoteEntry.js'
      },
      shared: packageJson.dependencies,
    }),
  ]
}

module.exports = merge(commonConfig, devConfig);