'use strict';

// Summary:
//  This script is used to start dev server, build result server and Rekit Studio.
//  Feel free to edit it to meet your specific requirement since this file has been copied to your project.

const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const rekitStudioMiddleWare = require('rekit-studio/middleware');
const request = require('request');
const pkgJson = require('../package.json');
const getConfig = require('../webpack-config');
const { ArgumentParser } = require('argparse');
const util = require('util');

const initEcsterDevServer = require('@ecster/ecster-dev-server');

const parser = new ArgumentParser({
    addHelp: true,
    description: 'Start an express server for webpack dev or build result.',
});

parser.addArgument(['--mode'], {
    // removed -m, interferes with -mock which is used by Ecster dev server /joli44
    help: 'Server mode, dev or build.',
    metavar: 'mode',
    choices: ['dev', 'build', 'studio'],
});

parser.addArgument(['-mock'], {
    help: 'Run Ecster rest server in mock mode',
    nargs: 0,
});

parser.addArgument(['-record'], {
    help: 'Run Ecster rest server in recording mode',
    nargs: 0,
});

parser.addArgument(['--readonly'], {
    help: 'Whether build server server is readonly',
    action: 'storeTrue',
});

const args = parser.parseArgs();

function startEcsterServer() {
    const ecsterBackend = initEcsterDevServer('https://secure1.ft.ecster.se', __dirname);
    const PORT = pkgJson.rekit.restPort;

    ecsterBackend.listen(PORT, () => {
        util.log(`Ecster Dev server listening at ${PORT}`);
        console.log();
    });
}

// Start an express server for development using webpack dev-middleware and hot-middleware
function startDevServer() {
    const app = express();
    const devConfig = getConfig('dev');
    //
    // devConfig.plugins.push(
    //     new webpack.DllReferencePlugin({
    //         context: srcPath,
    //         manifest: require(manifestPath),
    //     })
    // );

    const compiler = webpack(devConfig);
    app.use(
        devMiddleware(compiler, {
            publicPath: devConfig.output.publicPath,
            historyApiFallback: true,
        })
    );

    app.use(bodyParser.json()); // added by joli44

    app.use(hotMiddleware(compiler));

    // First, find files from src folder
    app.use(express.static(path.join(__dirname, '../src')));

    // Also support files from root folder, mainly for the dev-vendor bundle
    app.use(express.static(path.join(__dirname, '../')));

    // Proxy all calls /api when DEV to
    // const { rekit: { proxy: API } } = pkgJson;
    //
    // if (API) {
    //     app.get('/api/*', (req, res) => req.pipe(request.get(`${API}${req.originalUrl}`)).pipe(res));
    //     app.post('/api/*', (req, res) => req.pipe(request.post(`${API}${req.originalUrl}`)).pipe(res));
    // }

    console.log();
    console.log('------------------------------------------------------------');
    console.log('Ecster NOTE: set the no_proxy variable in your dev env to: ');
    console.log('no_proxy=localhost,127.0.0.1,se.shb.biz,shbmain.shb.biz');
    console.log('------------------------------------------------------------');
    console.log();

    const { rekit: { restPort } } = pkgJson;
    const proxyUrl = req => 'http://127.0.0.1:' + restPort + req.url;
    const proxyHeaders = req => ({
        'X-ECSTER-origin': req.header('X-ECSTER-origin'),
        'X-ECSTER-session': req.header('X-ECSTER-session'),
        cookie: req.header('cookie'),
    });

    // proxy all rest requests to Ecster dev server
    app.all('/rest/*', (req, res) => {
        console.log(req.method + ' on ' + req.url);
        request[req.method.toLowerCase()]({
            url: proxyUrl(req),
            rejectUnauthorized: false,
            headers: proxyHeaders(req),
            json: true,
            body: req.body,
        }).pipe(res);
    });

    // History api fallback
    app.use(fallback('index.html', { root: path.join(__dirname, '../src') }));

    // Other files should not happen, respond 404
    app.get('*', (req, res) => {
        console.log('Warning: unknown req: ', req.path);
        res.sendStatus(404);
    });

    app.listen(pkgJson.rekit.devPort, err => {
        if (err) {
            console.error(err);
        }
        console.log(`Dev server listening at http://localhost:${pkgJson.rekit.devPort}/`);
        // if (API) {
        //     console.log(`Proxy to API Server(Only for dev): ${API}`);
        // }
    });
}

// Start an express server for build result.
function startBuildServer() {
    const app = express();
    const root = path.join(__dirname, '../build');
    app.use(express.static(root));
    app.use(fallback('index.html', { root }));

    // Other files should not happen, respond 404
    app.get('*', (req, res) => {
        console.log('Warning: unknown req: ', req.path);
        res.sendStatus(404);
    });

    app.listen(pkgJson.rekit.buildPort, err => {
        if (err) {
            console.error(err);
        }

        console.log(`Dist server at http://localhost:${pkgJson.rekit.buildPort}/`);
    });
}

// Start an express server for rekit-studio.
function startStudioServer() {
    console.log('Starting Rekit Studio...');
    const app = express();
    const server = http.createServer(app);
    const root = path.join(__dirname, '../node_modules/rekit-studio/dist');
    app.use(rekitStudioMiddleWare()(server, app, { readonly: !!args.readonly }));
    app.use(express.static(root));
    app.use(fallback('index.html', { root }));

    // Other files should not happen, respond 404
    app.get('*', (req, res) => {
        console.log('Warning: unknown req: ', req.path);
        res.sendStatus(404);
    });

    const port = pkgJson.rekit.studioPort;
    server.listen(port, err => {
        if (err) {
            console.error(err);
        }

        console.log(`Studio server is listening at http://localhost:${port}/`);
    });
}

if (!args.mode || args.mode === 'build') startBuildServer();
if (!args.mode || args.mode === 'dev') {
    startEcsterServer();
    startDevServer();
}
if (!args.mode || args.mode === 'studio') startStudioServer();
