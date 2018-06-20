const compile = require('@ecster/ecster-webpack');
const devServers = require('./tools/dev-servers');

compile();

devServers.backend();
devServers.proxy();
devServers.studio();
