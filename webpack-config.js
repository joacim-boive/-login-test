'use strict';

//  Summary:
//    Get webpack config for different targets

const path = require('path');
const _ = require('lodash');
const { resolve } = require('path');
const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
// const crypto = require('crypto');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
// const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pkgJson = require('./package.json');

// TODO: with cache bust thing in it's name
const scriptName = 'main.js';

const cspConfig = [
    "default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' http://fonts.googleapis.com https://fonts.googleapis.com",
    'media-src *',
    "font-src 'self' http://fonts.gstatic.com https://fonts.gstatic.com",
    "connect-src 'self' {{restUrl}}",
    "img-src 'self' http://res.cloudinary.com https://res.cloudinary.com data: content:",
];

module.exports = type => {
    // type is one of [dev, dll, test, dist]
    // NOTE: for test, only module property is used.

    const isDev = type === 'dev';
    const isDist = type === 'dist';

    const BASE_PATH = {
        src: resolve('src'),
        build: resolve('build'),
        cordova: resolve('cordova/www'),
    };

    return {
        devtool: {
            dev: 'source-map',
            test: false,
            dist: 'eval-source-map',
        }[type],
        cache: true,
        context: path.join(__dirname, 'src'),
        entry: {
            dev: {
                main: [
                    'core-js/es6',
                    'core-js/es7',
                    'react-hot-loader/patch',
                    `webpack-hot-middleware/client?http://0.0.0.0:${pkgJson.rekit.devPort}`,
                    './styles/index.scss',
                    './index',
                ],
            },
            dist: {
                main: ['core-js/es6', 'core-js/es7', 'babel-polyfill', './styles/index.scss', './index'],
            },
            test: null,
        }[type],

        output: {
            // Js bundle name, [name] will be replaced by which is in entry
            filename: scriptName,

            // Where to save your build result
            path: path.join(__dirname, 'build/static'),

            // Exposed asset path.
            // NOTE: the end '/' is necessary
            // NOTE: leading ./ is important for build (not local dev)! /joli44
            publicPath: isDist ? './static/' : '/static/',
        },

        plugins: _.compact([
            //            new CleanWebpackPlugin('build/', { verbose: true }),
            new NpmInstallPlugin(),
            isDev && new webpack.HotModuleReplacementPlugin(),
            //            new ProgressPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            isDist && new LodashModuleReplacementPlugin(), // joli44, what does this on do??
            isDist && new webpack.optimize.UglifyJsPlugin(),
            isDist && new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(type === 'dist' ? 'production' : type),
                },
            }),
            new CopyWebpackPlugin([
                {
                    from: `${BASE_PATH.src}/i18n`,
                    to: `${BASE_PATH.build}/static/i18n/`,
                    flatten: true,
                },
                {
                    from: `${BASE_PATH.src}/favicon.png`,
                    to: `${BASE_PATH.build}`,
                    flatten: true,
                },
            ]),

            // Web - index.html
            new HtmlWebpackPlugin({
                // Plugin specific
                inject: false,
                // TODO: index.ejs ... can't make it work right now for "npm start"...
                template: `${BASE_PATH.src}/index.html`,
                // filename: isDev ? `${BASE_PATH.src}/index.html` : `${BASE_PATH.build}/index.html`,
                filename: `${BASE_PATH.build}/index.html`,
                // Injected variables
                analyticsId: 'UA-123456-1',
                scriptName,
            }),

            // App - index.html
            new HtmlWebpackPlugin({
                // Plugin specific
                inject: false,
                template: `${BASE_PATH.src}/index-app.ejs`,
                filename: `${BASE_PATH.cordova}/index.html`, // Plugin specific
                // Injected variables
                analyticsId: 'UA-123456-1', // Injected variable
                cspConfig: cspConfig.join('; ').replace(/{{restUrl}}/, 'https://secure.ecster.se'),
                scriptName, // Injected variable
            }),
        ]),

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules|build/,
                    loader: 'babel-loader?cacheDirectory=true',
                },
                {
                    test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader',
                },
                {
                    test: /\.scss$/,
                    loaders: [
                        'style-loader',
                        'css-loader?importLoaders=2',
                        'resolve-url-loader?sourceMap',
                        'sass-loader?sourceMap',
                    ],
                },
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader',
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader',
                },
                {
                    test: /\.(png|jpe?g|gif)$/,
                    loader: 'url-loader?limit=8192',
                },
            ],
        },
    };
};
