'use strict';

//  Summary:
//    Get webpack config for different targets

const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pkgJson = require('./package.json');

module.exports = type => {
    // type is one of [dev, dll, test, dist]
    // NOTE: for test, only module property is used.

    const isDev = type === 'dev';
    const isDist = type === 'dist';

    return {
        devtool: {
            dev: 'source-map',
            dll: false,
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
            dll: {
                // Here dll is only used for dev.
                'dev-vendors': [
                    'react-hot-loader',
                    'react-proxy',
                    'babel-polyfill',
                    'lodash',
                    'react',
                    'react-dom',
                    'react-router',
                    'react-redux',
                    'react-router-redux',
                    'redux',
                    'redux-logger',
                    'redux-thunk',
                ],
            },
            dist: {
                main: ['core-js/es6', 'core-js/es7', 'babel-polyfill', './styles/index.scss', './index'],
            },
            test: null,
        }[type],

        output: {
            // Js bundle name, [name] will be replaced by which is in entry
            filename: '[name].js',

            // Where to save your build result
            path: path.join(__dirname, 'build/static'),

            // Exposed asset path.
            // NOTE: the end '/' is necessary
            // NOTE: leading ./ is important for build (not local dev)! /joli44
            publicPath: isDist ? './static/' : '/static/',
        },

        plugins: _.compact([
            new NpmInstallPlugin(),
            isDev && new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            isDist && new LodashModuleReplacementPlugin(),
            isDist && new webpack.optimize.UglifyJsPlugin(),
            isDist && new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(type === 'dist' ? 'production' : type),
                },
            }),
            new CopyWebpackPlugin([
                {
                    // language resources
                    from: './i18n',
                    to: 'i18n/',
                    flatten: true,
                },
            ]),
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
                        'css-loader?importLoaders=1',
                        'resolve-url-loader',
                        'sass-loader?sourceMap',
                    ],
                },
                {
                    test: /\.DISABLE-ORIGINAL-ascss$/,
                    loader: isDev
                        ? 'style-loader!css-loader?sourceMap!sass-loader?sourceMap'
                        : 'style-loader!css-loader!sass-loader',
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
