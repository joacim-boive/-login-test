// Summary:
//   This is the entry of the application, works together with index.html.

import './detect-ie-polyfills';

import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import { Translate } from '@ecster/ecster-i18n';
import { setBaseUrl, setErrorHandler } from '@ecster/ecster-net/v2';
import Session from '@ecster/ecster-net/lib/Session';
import {
    setDimension,
    DIMENSION_COUNTRY,
    DIMENSION_APP_NAME,
    DIMENSION_APP_VERSION,
    DIMENSION_TECH_ENV
} from '@ecster/ecster-analytics/v2';

import configStore from './common/configStore';
import routeConfig from './common/routeConfig';
import Root from './Root';
import { setApplicationCountry, setLocale } from './features/home/redux/actions';
import history from './common/history';

export const store = configStore();

Session.set('sessionKey', window.sessionStorage.getItem('sessionKey')); // Remove when API uses sessionStorage instead

const renderApp = app => {
    render(<AppContainer>{app}</AppContainer>, document.getElementById('react-root'));
};

const initApplication = () => {
    Session.set('origin', 'mypages');

    // TODO: tmp solutions, fix later
    const lang = window.location.hash.split('lang=')[1] || 'sv';
    const country = 'SE';
    // const country = 'FI';
    const { EcsterConfig: conf } = window;

    store.dispatch(setApplicationCountry(country));
    store.dispatch(setLocale('sv-SE'));

    setDimension(DIMENSION_APP_NAME, 'login');
    setDimension(DIMENSION_COUNTRY, country);

    if (conf) {
        if (conf.version && !conf.version.match(/^%BUILD/)) {
            setDimension(DIMENSION_APP_VERSION, conf.version);
        }
        if (conf.env) {
            setDimension(DIMENSION_TECH_ENV, conf.env);
        }
        // Set base URL
        if (conf.baseURL) {
            setBaseUrl(conf.baseURL);
        }
    }

    setErrorHandler((xhr, body) => {
        if (body.status === 401) history.push('/authentication/logout');
    });

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
