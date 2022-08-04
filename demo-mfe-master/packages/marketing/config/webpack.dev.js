//** Merge two different webpack configs*/
const { merge } = require('webpack-merge');
//** Remember, this is what is going to take some kind of HTML file inside of our project and inject a couple of different script tags inside of it. */
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * Multiple separate builds should form a single application. These separate builds should not have dependencies between each other, so they can be developed and deployed individually.
This is often known as Micro-Frontends, but is not limited to that.
 */
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8082,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      //** name -> name of our subProject */
      name: 'marketing',
      //** standard name "remoteEntry.js" */
      filename: 'remoteEntry.js',
      //** what file we want to make available to the outside world */
      //** when someone asks for ./MarketingApp we are going to serve './src/bootstrap' */
      exposes: {
        './MarketingApp' : './src/bootstrap'
      },
      shared: packageJson.dependencies
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ]
}

module.exports = merge(commonConfig, devConfig);