'use strict';

//  Build for production

const path = require('path');
const shell = require('shelljs');
const crypto = require('crypto');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const config = require('../webpack-config')('dist');
const { ArgumentParser } = require('argparse');

const parser = new ArgumentParser();

parser.addArgument(['--debug', '-d']);
const args = parser.parseArgs();

// Clean folder. TODO: remove? Handled in webpack.config?
const buildFolder = path.join(__dirname, '../build');
shell.rm('-rf', buildFolder);
shell.mkdir(buildFolder);
shell.mkdir(`${buildFolder}/static`);

// Webpack build
console.log('Building, it may take a few seconds...');
const compiler = webpack(config);

compiler.run(err => {
    console.log(err || 'Done...');
});
