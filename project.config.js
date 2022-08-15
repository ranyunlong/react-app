const path = require('path');
module.exports = {
  /**
   * webpack config options
   * see: https://webpack.js.org/configuration/
   */
  webpack: {
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
      "@quick-toolkit/react-router": "ReactRouter",
      "@quick-toolkit/react-router-dom": "ReactRouterDOM",
      axios: "axios",
      redux: "Redux",
      moment: "moment",
      "react-redux": "ReactRedux",
      validator: "validator",
      "@ant-design/icons": "icons",
      "reflect-metadata": "Reflect",
      history: 'history',
    }
  },
  /**
   * style configs
   */
  style: {
    /**
     * css-loader options
     * see: https://webpack.js.org/loaders/css-loader#options
     */
    css: {},
    /**
     * less-loader options
     * see: https://webpack.js.org/loaders/less-loader#options
     */
    less: {
      lessOptions: {
        modifyVars: {},
        javascriptEnabled: true,
      }
    },
    /**
     * sass-loader options
     * see: https://webpack.js.org/loaders/sass-loader/#options
     */
    sass: {},
    /**
     * postcss-loader options
     * https://webpack.js.org/loaders/postcss-loader/#options
     */
    postcss: {},
  },
  /**
   * babel-loader options
   * see: https://webpack.js.org/loaders/babel-loader/#options
   */
  babel: {},
  /**
   * ts-loader options
   * see: https://github.com/TypeStrong/ts-loader
   */
  ts: {},
  /**
   * file-loader options
   * see: https://github.com/webpack-contrib/file-loader
   */
  file: {},
  /**
   * EslintWebpackPlugin options
   * see: https://webpack.js.org/plugins/eslint-webpack-plugin/#options
   */
  eslint: {},
  /**
   * StylelintWebpackPlugin options
   * see: https://webpack.js.org/plugins/stylelint-webpack-plugin/#options
   */
  styleLint: null,
  // DevServer see: https://webpack.js.org/configuration/dev-server
  devServer: {
    port: 3002
  },
  swaggers: [
    {
      url: '/api/user-service/v2/api-docs',
      outputs: [
        {
          dest: path.resolve('api', 'user-service'),
          dtos: [
            {
              method: 'get',
              path: '/authority/list',
              name: 'AuthorityListDto',
            },
          ],
          vos: [
            {
              target: 'HttpResource«object»',
              name: 'HttpResource<T>',
            },
          ],
        }
      ]
    },
  ]
}
