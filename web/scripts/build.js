/* eslint no-console:0, import/no-extraneous-dependencies:0 */
const webpack = require('webpack');
const webpackConfig = require('../configs/webpack.conf');

const compiler = webpack(webpackConfig);

const callback = (err, stats) => {
    if (err) throw new Error(err);

    if (stats.hasErrors() || stats.hasWarnings()) {
        console.log(stats.toString({
            colors: true,
            chunks: ['vendor', 'app'],
            assets: false,
            children: false,
        }));
    }
};

compiler.run(callback);
