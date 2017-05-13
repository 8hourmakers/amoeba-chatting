/* eslint comma-dangle:0, import/no-extraneous-dependencies:0 */
const autoprefixer = require('autoprefixer');
const { BannerPlugin, DefinePlugin, LoaderOptionsPlugin, NoEmitOnErrorsPlugin, ProgressPlugin } = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CommonsChunkPlugin, UglifyJsPlugin } = require('webpack').optimize;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('../package.json');
const env = require('./env');
const paths = require('./paths');

const appStyles = new ExtractTextPlugin('main.css');
const vendorStyles = new ExtractTextPlugin('vendor.css');

const config = {};

config.entry = {
    vendor: [
        'angular',
        'angular-ui-router',
        'moment',
    ],
    app: paths.appEntryPath,
};

config.output = {
    path: paths.buildOutputPath,
    filename: '[name].js',
};

if (env.isDevelopment()) {
    config.devtool = 'source-map';
}

config.module = {
    rules: [
        {
            enforce: 'pre',
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: [
                /\/node_modules\//,
            ],
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: [
                /\/node_modules\//,
            ],
        },
        { test: /\.html$/, loader: 'raw-loader' },
        {
            test: /\.less$/,
            use: appStyles.extract({
                fallback: 'style-loader',
                use: 'css-loader!postcss-loader!less-loader',
            }),
        },
        {
            test: /\.css$/,
            use: vendorStyles.extract({
                fallback: 'style-loader',
                use: 'css-loader!postcss-loader',
            }),
        },
    ],
};

config.plugins = [
    new NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin([paths.buildOutputPath], {
        root: paths.rootPath,
        verbose: false,
    }),
    new CopyWebpackPlugin([{
        from: paths.assetsPath,
        to: './assets', // Relative from output path
    }]),
    new CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
        template: paths.indexHtmlPath,
        filename: 'index.html',
        inject: 'body',
        chunks: ['vendor', 'app'],
    }),
    new DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
    }),
    new BannerPlugin(`${pkg.name}@${pkg.version}`),
    new ProgressPlugin(),
    new LoaderOptionsPlugin({
        options: {
            postcss: [autoprefixer({
                browsers: ['> 1%', 'last 3 versions', 'ie 10-11'],
            })],
        },
    }),
    appStyles,
    vendorStyles,
];

if (env.isProduction()) {
    config.plugins.unshift(
        new UglifyJsPlugin({
            output: { comments: false },
        })
    );
}

config.node = {
    fs: 'empty',
    crypto: 'empty',
    process: true,
};

module.exports = config;
