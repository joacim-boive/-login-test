// Copied from Dashboard X, src/util/api.js
// todo: @ecster node modules?

import Ajax from '@ecster/ecster-net/lib/Ajax';
import Session from '@ecster/ecster-net/lib/Session';
import history from './history';

const successHandler = (xhr, body) => Promise.resolve(body);
const errorHandler = (xhr, body) => {
    if (body.status === 401) history.push('/authentication/logout');
    return Promise.reject(body);
};

const addQueryParams = (url, queryParams = []) =>
    `${url}?${Object.keys(queryParams)
        .map(key => queryParams[key] && `${key}=${queryParams[key]}&`)
        .join('')
        .replace(/&$/, '')
        .replace(/\?$/, '')}`; // Remove trailing & and ?

export const post = (url, data, successCall = successHandler, errorCall = errorHandler) =>
    Ajax.post({ url }, data)
        .then(successCall)
        .catch(errorCall);

export const put = (url, data, successCall = successHandler, errorCall = errorHandler) =>
    Ajax.put({ url }, data)
        .then(successCall)
        .catch(errorCall);

export const get = (url, data, successCall = successHandler, errorCall = errorHandler) =>
    Ajax.get({ url }, data)
        .then(successCall)
        .catch(errorCall);

export const del = (url, data, successCall = successHandler, errorCall = errorHandler) =>
    Ajax.delete({ url }, data)
        .then(successCall)
        .catch(errorCall);

export const setSession = sessionKey => {
    window.sessionStorage.setItem('sessionKey', sessionKey);
    Session.set('sessionKey', sessionKey);
};

export const removeSession = () => {
    window.sessionStorage.removeItem('sessionKey');
    Session.set('sessionKey');
};

export const setOrigin = origin => {
    Session.set('origin', origin);
};

// export const findErrorText = (e) => {
//     const jsonResponse = JSON.parse(e.response);
//
//     if (jsonResponse && jsonResponse.detail) {
//         return jsonResponse.detail;
//     }
//
//     return 'Okänt fel uppstod';
// };
