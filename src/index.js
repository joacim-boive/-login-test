// Summary:
//   This is the entry of the application, works together with index.html.

import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import { Translate } from '@ecster/ecster-i18n';
import Ajax from '@ecster/ecster-net/lib/Ajax';
import Session from '@ecster/ecster-net/lib/Session';

import configStore from './common/configStore';
import routeConfig from './common/routeConfig';
import Root from './Root';
import { setApplicationCountry, setLocale } from './features/home/redux/actions';

export const store = configStore();

// TODO: remove temporary polyfill fix!!
// TODO: remove temporary polyfill fix!!
// TODO: remove temporary polyfill fix!!
// TODO: remove temporary polyfill fix!!
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(search, pos) {
        return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    };
}

// https://tc39.github.io/ecma262/#sec-array.prototype.includes
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function(searchElement, fromIndex) {

            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            // 1. Let O be ? ToObject(this value).
            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If len is 0, return false.
            if (len === 0) {
                return false;
            }

            // 4. Let n be ? ToInteger(fromIndex).
            //    (If fromIndex is undefined, this step produces the value 0.)
            var n = fromIndex | 0;

            // 5. If n ≥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            function sameValueZero(x, y) {
                return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }

            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                // b. If SameValueZero(searchElement, elementK) is true, return true.
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }
                // c. Increase k by 1.
                k++;
            }

            // 8. Return false
            return false;
        }
    });
}

Session.set('sessionKey', window.sessionStorage.getItem('sessionKey')); // Remove when API uses sessionStorage instead

const renderApp = app => {
    render(<AppContainer>{app}</AppContainer>, document.getElementById('react-root'));
};

const initApplication = config => {
    Session.set('origin', 'mypages');

    // TODO: tmp solutions, fix later
    const lang = window.location.hash.split('lang=')[1] || 'sv';
    const country = 'SE';
    // const country = 'FI';

    store.dispatch(setApplicationCountry(country));
    store.dispatch(setLocale('sv-SE'));

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
