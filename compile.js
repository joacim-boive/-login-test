const compile = require('@ecster/ecster-webpack');
const devServers = require('./tools/dev-servers');

compile();

if (process.argv.indexOf('--dev')) {
    // Only run servers during development
    devServers.backend();
    devServers.proxy();
    devServers.studio();
}
