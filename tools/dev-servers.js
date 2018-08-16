'use strict';

// Summary:
//  This script is used to start dev server, build result server and Rekit Studio.
//  Feel free to edit it to meet your specific requirement since this file has been copied to your project.

const path = require('path');
const http = require('http');
const express = require('express');
const fallback = require('express-history-api-fallback');
const rekitStudioMiddleWare = require('rekit-studio/middleware');
const request = require('request');
const pkgJson = require('../package');

const initEcsterDevServer = require('@ecster/ecster-dev-server');

// eslint-disable-next-line no-unused-vars
const colors = require('colors');

const DEV_SERVER = 'https://secure5.ft.ecster.se';

const backend = () => {
    const ecsterBackend = initEcsterDevServer(DEV_SERVER, __dirname);
    const PORT = pkgJson.rekit.restPort;

    ecsterBackend.listen(PORT, () => {
        console.log();
        console.log(`Ecster Dev server listening at ${PORT}`.green);
        console.log();
    });
};

// Start an express server for development using proxy
const proxy = () => {
    const app = express();

    console.log();
    console.log('     Ecster NOTE: set the no_proxy variable in your dev env to:     '.inverse.red);
    console.log(' no_proxy=localhost,127.0.0.1,se.shb.biz,shbmain.shb.biz'.red);
    console.log();

    const {
        rekit: { restPort },
    } = pkgJson;
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

    // Other files should not happen, respond 404
    app.get('*', (req, res) => {
        console.log('Warning: unknown req: '.red, req.path);
        res.sendStatus(404);
    });

    app.listen(pkgJson.rekit.devPort, err => {
        if (err) {
            console.error(err);
        }
        console.log(`Proxy server listening at http://localhost:${pkgJson.rekit.devPort}/`.green);
    });
};

// Start an express server for rekit-studio.
const studio = () => {
    const app = express();
    const server = http.createServer(app);
    const root = path.join(__dirname, './node_modules/rekit-studio/dist');

    app.use(rekitStudioMiddleWare()(server, app, { readonly: false }));
    app.use(express.static(root));
    app.use(fallback('index.html', { root }));

    // Other files should not happen, respond 404
    app.get('*', (req, res) => {
        console.log('Warning: unknown req: '.red, req.path);
        res.sendStatus(404);
    });

    const port = pkgJson.rekit.studioPort;
    server.listen(port, err => {
        if (err) {
            console.error(err);
        }

        console.log(`Studio server is listening at http://localhost:${port}/`);
    });
};

module.exports = {
    backend,
    proxy,
    studio,
};
