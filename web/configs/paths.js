const path = require('path');

const rootPath = path.resolve(__dirname, '../');
const srcPath = path.resolve(__dirname, '../src');
const buildOutputPath = path.resolve(__dirname, '../build');
const appEntryPath = path.resolve(srcPath, 'main.js');
const staticsPath = path.resolve(buildOutputPath, 'statics/');
const assetsPath = path.resolve(srcPath, 'assets/');
const distIndexHtmlPath = path.resolve(buildOutputPath, 'index.html');
const indexHtmlPath = path.resolve(srcPath, 'index.html');

module.exports = {
    rootPath,
    srcPath,
    buildOutputPath,
    appEntryPath,
    staticsPath,
    assetsPath,
    distIndexHtmlPath,
    indexHtmlPath,
};
