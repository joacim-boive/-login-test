// Summary:
//   This is the entry of the application, works together with index.html.

import 'babel-polyfill';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import { Translate } from '@ecster/ecster-i18n';

import configStore from './common/configStore';
import routeConfig from './common/routeConfig';
import Root from './Root';

const store = configStore();

const renderApp = app => {
    render(<AppContainer>{app}</AppContainer>, document.getElementById('react-root'));
};

// basePath, language, country
Translate.init('static/i18n', 'sv', undefined).then(() => {
    renderApp(<Root store={store} routeConfig={routeConfig} />);
});

// Hot Module Replacement API
/* istanbul ignore if  */
if (module.hot) {
    module.hot.accept('./common/routeConfig', () => {
        const nextRouteConfig = require('./common/routeConfig').default; // eslint-disable-line
        renderApp(<Root store={store} routeConfig={nextRouteConfig} />);
    });
}
