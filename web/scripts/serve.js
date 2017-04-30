/* eslint no-console:0, import/no-extraneous-dependencies:0 */
const webpack = require('webpack');
const historyApiFallback = require('connect-history-api-fallback');
const bs = require('browser-sync').create();
const paths = require('../configs/paths');
const webpackConfig = require('../configs/webpack.conf');

const compiler = webpack(webpackConfig);

compiler.watch({}, (err, stats) => {
    if (stats.hasErrors() || stats.hasWarnings()) {
        console.log(stats.toString({
            colors: true,
            chunks: false,
            assets: false,
            children: false,
        }));
    }

    if (bs.active) {
        bs.reload();
    } else {
        bs.init({
            server: {
                baseDir: paths.buildOutputPath,
                middleware: [historyApiFallback()],
            },
        });
    }
});
