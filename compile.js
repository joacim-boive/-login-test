const compile = require('@ecster/ecster-webpack');

compile();

// Start an express server for rekit-studio.

// Tests from Rekit Studio does NOT work - run the tests using npm scripts!
const studio = () => {
    const path = require('path');
    const http = require('http');
    const express = require('express');
    const rekitStudioMiddleWare = require('rekit-studio/middleware');
    const fallback = require('express-history-api-fallback');

    const pkgJson = require('./package');

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

if (process.argv.indexOf('--dev') > 0) {
    // Only run servers during development
    studio();
}
