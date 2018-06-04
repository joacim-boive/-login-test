// Summary:
//   This is the entry of the application, works together with index.html.

import 'babel-polyfill';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import { Translate } from '@ecster/ecster-i18n';
import Ajax from '@ecster/ecster-net/lib/Ajax';
import Session from '@ecster/ecster-net/lib/Session';

import configStore from './common/configStore';
import routeConfig from './common/routeConfig';
import Root from './Root';

export const store = configStore();

Session.set('sessionKey', window.sessionStorage.getItem('sessionKey')); // Remove when API uses sessionStorage instead

const renderApp = app => {
    render(<AppContainer>{app}</AppContainer>, document.getElementById('react-root'));
};

const initApplication = config => {
    Session.set('origin', 'mypages');

    /** TODO
     *
     * Temporary implementation of multilanguage - fix this properly after demo!
     */
    let lang = window.location.hash.split('?lang=')[1];

    if (!lang) {
        lang = 'sv';
    }

    if (config && config.ajaxBaseUrl) {
        Ajax.setBaseUrl(config.ajaxBaseUrl);
    }

    // basePath, language, country
    Translate.init('static/i18n', lang, undefined).then(() => {
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
};

if (window.cordovaApp) {
    window.initApplication = initApplication; // called on deviceready event
} else {
    initApplication();
}
