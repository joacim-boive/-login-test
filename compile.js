const compile = require('@ecster/ecster-webpack');
const devServers = require('./tools/dev-servers');

compile();

if (process.argv.indexOf('--dev') > 0) {
    // Only run servers during development
    // devServers.backend();
    // devServers.proxy();
    devServers.studio();
}
